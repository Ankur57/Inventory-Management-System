const mongoose = require('mongoose')

const connectDB = async()=>{
    mongoose.connect(process.env.DB_CONNECT,{
        useUnifiedTopology: true,
        useNewUrlParser : true,
    }).then(()=>console.log("Connect to DB"))
    .catch(err=>console.log("Could not connect to DB",err))
}

module.exports = connectDB;