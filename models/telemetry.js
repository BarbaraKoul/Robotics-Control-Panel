const mongoose= require=('mongoose')

const telemetrySchema = mongoose.Schema({
  robotId: String,
  battery: Number,
  timestamp: { type: Date, default: Date.now }
})

telemetrySchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
  }
})

module.exports= mongoose.model('Panel', telemetrySchema)