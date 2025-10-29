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

app.use(cors({
  origin: 'https://inventory-management-system-frontend-j621.onrender.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie']
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
