const express = require('express')
const router = express.Router()
const ROSLIB = require('roslib')

const ros = new ROSLIB.Ros({ url: 'ws://localhost:9090' })

const cmdVel = new ROSLIB.Topic({
  ros,
  name: '/turtle1/cmd_vel',
  messageType: 'geometry_msgs/Twist',
})

router.post('/', (req, res) => {
  const { linear_velocity, angular_velocity } = req.body

  const twist = new ROSLIB.Message({
    linear: { x: linear_velocity, y: 0, z: 0 },
    angular: { x: 0, y: 0, z: angular_velocity },
  });

  cmdVel.publish(twist)
  res.json({ status: 'ok' })
})

module.exports = router
