const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ROSLIB = require('roslib')

const app=express()

app.use(cors())
app.use(express.json())

const ros = new ROSLIB.Ros({
  url: "ws://localhost:9090"
})

const poseListener = new ROSLIB.Topic({
  ros: ros,
  name: "/turtle1/pose",
  messageType: "turtlesim/Pose"
})

poseListener.subscribe((message) => {
  latestPose = {
    x: message.x,
    y: message.y,
    theta: message.theta,
    linear_velocity: message.linear_velocity,
    angular_velocity: message.angular_velocity,
    timestamp: Date.now()
  }
})

app.get("/api/pose", (req, res) => {
  res.json(latestPose)
})


app.get('/api/test', (req, res) => {
    res.json({message: 'Server ok'})
})

module.exports=app