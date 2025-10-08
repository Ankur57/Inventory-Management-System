const mongoose = require('mongoose')

const categories = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }
},{ timestamps: true })

const category = mongoose.model('Category',categories)
module.exports = category;