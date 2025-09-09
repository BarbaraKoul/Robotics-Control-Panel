const express = require("express")
const ROSLIB = require("roslib")
const Panel = require("../models/telemetry")
const { io } = require("../app")

const panelRouter = express.Router()

const ros = new ROSLIB.Ros({
  url: "ws://localhost:9090",
})

ros.on("connection", () => {
  console.log("Connected to rosbridge")
})

ros.on("error", (error) => {
  console.error("Error connecting to rosbridge:", error)
})

ros.on("close", () => {
  console.log("Connection to rosbridge closed")
})

const poseListener = new ROSLIB.Topic({
  ros: ros,
  name: "/turtle1/pose",
  messageType: "turtlesim/Pose",
})

let latestPose = null;

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
    console.log("Pose saved:", latestPose)
  } catch (err) {
    console.error("Error saving pose:", err)
  }
})

panelRouter.get("/", (req, res) => {
  if (!latestPose) {
    return res
      .status(503)
      .json({ error: "Pose data not yet available from ROS" })
  }
  res.json(latestPose)
})

panelRouter.get("/history", async (req, res) => {
  try {
    const history = await Panel.find().sort({ timestamp: -1 }).limit(30)
    res.json(history)
  } catch (err) {
    console.error("Error fetching history:", err)
    res.status(500).json({ error: "Failed to fetch history" })
  }
  io.emit("pose_update", latestPose)
})

module.exports = panelRouter
