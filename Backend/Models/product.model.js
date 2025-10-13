const mongoose = require('mongoose')

const products = new mongoose.Schema({
    name : {
        type : String,
        required : true 
    },
    quantity : {
        type : Number,
        default : 0
    }
},{ timestamps: true })

const product = mongoose.model('Product',products)
module.exports = product;