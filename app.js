const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const panelRouter = require('./controllers/panel')
const { mongoUrl } = require('./utils/config')
const http = require("http")
const { Server } = require("socket.io")

const app=express()

mongoose.connect(mongoUrl)

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {
  console.log("New WebSocket connection:", socket.id)
})

app.use(cors())
app.use(express.json())
app.use("/api/pose", panelRouter)


app.get('/api/test', (req, res) => {
    res.json({message: 'Server ok'})
})

module.exports = { app, server, io }