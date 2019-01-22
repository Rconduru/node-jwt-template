const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    email: { tye: String, required: true },
    password:{ type: String, min: 6, max: 12, required: true }
})

module.exports = mongoose.model('User', userSchema)
