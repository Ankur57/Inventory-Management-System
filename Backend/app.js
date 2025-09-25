const dotenv = require('dotenv')//Environment variable
dotenv.config();
const express = require('express');
const app = express();
const connectToDb = require('./db/db');
connectToDb();
const userRoutes = require('./Routes/user.routes');
const cors = require('cors')
app.use(cors());
const cookieParser = require('cookie-parser');
app.use(cookieParser())


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    console.log("Server is Running");
    res.send("Hello World");
}
)

app.use('/user',userRoutes);

module.exports = app;