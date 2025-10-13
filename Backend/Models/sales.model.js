const mongoose = require('mongoose')

const sales = new mongoose.Schema({
    product : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    sellingPrice : {
        type : Number,
        required : true
    },
    profit : {
        type : Number,
        required : true
    }
},{ timestamps: true })

const Sale = mongoose.model('Sales',sales)
module.exports = Sale;