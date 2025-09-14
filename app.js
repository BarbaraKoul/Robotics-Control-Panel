const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const panelRouter = require('./controllers/panel')
const cmdVelRoute = require('./controllers/cmdVel')
const { mongoUrl } = require('./utils/config')
const http = require("http")
const { Server } = require("socket.io")
const path = require('path')

const app = express()

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB successfully')
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message)
  })

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})

global.io = io

io.on("connection", (socket) => {
  console.log("New WebSocket connection:", socket.id)
})

app.use(express.static(path.resolve(__dirname, 'client', 'dist')))
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json())
app.use("/api/pose", panelRouter)
app.use("/api/cmd_vel", cmdVelRoute)

app.get('/api/test', (req, res) => {
  res.json({message: 'Server ok'})
})

app.get('/api/health', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping()
    res.json({ 
      status: 'OK', 
      database: 'Connected',
      ros: latestPose ? 'Receiving data' : 'No data yet'
    })
  } catch (error) {
    res.status(500).json({ 
      status: 'Error', 
      database: 'Disconnected',
      error: error.message 
    })
  }
})

module.exports = { app, server, io }