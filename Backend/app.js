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

const allowedOrigins = [
  'http://localhost:5173',
  'https://inventory-management-system-frontend-j621.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin); // helpful for debugging
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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
