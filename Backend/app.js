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

const corsOptions = {
  origin: 'https://inventory-management-system-frontend-j621.onrender.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Set-Cookie']
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', 'https://inventory-management-system-frontend-j621.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});


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
