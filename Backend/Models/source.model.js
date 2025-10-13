const mongoose = require('mongoose')

const sources = new mongoose.Schema({
    name : {
        type : String,
        required : true 
    },
    sales : {
        type : Number,
        default : 0
    },
    description : {
        type : String,
        default : 0
    }
},{ timestamps: true })

const source = mongoose.model('Source',sources)
module.exports = source;