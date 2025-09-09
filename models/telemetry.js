const mongoose= require=('mongoose')

const telemetrySchema = mongoose.Schema({
  x: Number,
  y: Number,
  theta: Number,
  linear_velocity: Number,
  angular_velocity: Number,
  timestamp: { type: Date, default: Date.now }
})


module.exports= mongoose.model('Panel', telemetrySchema)