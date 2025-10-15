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

<<<<<<< HEAD
// Define the specific origins you want to allow
=======
>>>>>>> 9b2f4e2411c4660e846a8359f93bea99bbff6e84
const allowedOrigins = [
    'http://localhost:5173', // Keep this for local development
    'https://inventory-management-system-frontend-j621.onrender.com' // <-- The REQUIRED DEPLOYED URL
];

app.use(cors({
    origin: function (origin, callback) {
        // If the origin is in the allowed list, or if it's a request with no origin (e.g., cURL, some non-browser requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            // Block the request if the origin is not allowed
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Ensure all methods you use are listed
    credentials: true // Keep this since you are using cookie-parser and credentials
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
