const dotenv = require('dotenv'); // Environment variable
dotenv.config();
const express = require('express');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./Routes/user.routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// ✅ Connect to Database
connectToDb();

// ✅ Correct CORS setup
app.use(cors({
  origin: '*', // your React frontend URL
  credentials: true                // allows cookies to be sent and received
}));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Test Route
app.get('/', (req, res) => {
  console.log("Server is Running");
  res.send("Hello World");
});

// ✅ Routes
app.use('/user', userRoutes);

module.exports = app;
