const express = require('express')
const ROSLIB = require('roslib')
const Panel = require('../models/telemetry')

const panelRouter = express.Router()

const ros = new ROSLIB.Ros()

function connectToROS() {
  try {
    ros.connect('ws://localhost:9090')
  } catch (error) {
    console.log('Retrying ROS connection in 3 seconds...')
    setTimeout(connectToROS, 3000)
  }
}

connectToROS()

ros.on('connection', () => {
  console.log('Connected to rosbridge successfully')
})

ros.on('error', (error) => {
  console.error('ROS connection error:', error)
  console.log('Retrying in 5 seconds...')
  setTimeout(connectToROS, 5000)
})

ros.on('close', () => {
  console.log('Connection to rosbridge closed')
  console.log('Reconnecting in 3 seconds...')
  setTimeout(connectToROS, 3000)
})

const poseListener = new ROSLIB.Topic({
  ros: ros,
  name: '/turtle1/pose',
  messageType: 'turtlesim/Pose',
})

let latestPose = null

poseListener.subscribe(async (message) => {
  latestPose = {
    x: message.x,
    y: message.y,
    theta: message.theta,
    linear_velocity: message.linear_velocity,
    angular_velocity: message.angular_velocity,
    timestamp: Date.now(),
  }

  try {
    const poseDoc = new Panel(latestPose)
    await poseDoc.save()
    console.log('Pose saved to MongoDB')

    if (global.io) {
      global.io.emit('pose_update', latestPose)
    }
  } catch (err) {
    console.error('Error saving pose to MongoDB:', err.message)
  }
})

panelRouter.get('/', (req, res) => {
  if (!latestPose) {
    return res.status(503).json({
      error: 'Pose data not yet available from ROS',
      status: 'Waiting for turtle data...'
    })
  }
  res.json(latestPose)
})

panelRouter.get('/history', async (req, res) => {
  try {
    const history = await Panel.find().sort({ timestamp: -1 }).limit(30)
    res.json(history)
  } catch (err) {
    console.error('Error fetching history:', err)
    res.status(500).json({
      error: 'Failed to fetch history',
      details: err.message
    })
  }
})

module.exports = panelRouter