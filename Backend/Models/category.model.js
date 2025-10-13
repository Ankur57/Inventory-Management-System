const mongoose = require('mongoose')

const categories = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        default : 0
    }
},{ timestamps: true })

const category = mongoose.model('Category',categories)
module.exports = category;