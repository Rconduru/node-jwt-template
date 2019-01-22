const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    cell_phone: { type: Number },
    value_account: { type: Number },
    balance_account: { type: Number },
})

module.exports = mongoose.model('Client', clientSchema)
