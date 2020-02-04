const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true }
}, {
  timestamps: true
})

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  height: { type: Number, required: false },
  comments: [ commentSchema ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User' , required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('Person', personSchema)