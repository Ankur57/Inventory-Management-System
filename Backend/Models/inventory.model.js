const mongoose = require('mongoose')

const InventorySchema = new mongoose.Schema({
    id:{
         type : String,
         required : true,
    },
    category : {
        type : String,
        required : true
    },
    product : {
        type : String,
        required : true
    },
    sellingPrice : {
        type : Number,
        required : true
    },
    costPrice : {
        type : Number,
        required : true
    },
    profit : {
        type : Number,
        required : true
    },
}, { timestamps: true })

const InventoryModel = mongoose.model('Inventory',InventorySchema);

module.exports = InventoryModel;