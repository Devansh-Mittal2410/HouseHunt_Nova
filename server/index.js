const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connect.js");

const app = express();

//////dotenv config/////////////////////
dotenv.config({ path: path.resolve(__dirname, ".env") });

if (!process.env.JWT_KEY) {
  throw new Error("Missing JWT_KEY in server/.env");
}

if (!process.env.MONGO_URI && !process.env.MONGO_DB) {
  throw new Error("Missing MONGO_URI (or MONGO_DB) in server/.env");
}


const PORT = process.env.PORT || 8001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const allowedOrigins = CLIENT_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean);
const uploadsDir = process.env.UPLOAD_DIR || path.join(__dirname, "uploads");

app.set("trust proxy", 1);

app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(cookieParser());

app.use("/uploads", express.static(uploadsDir));
app.use('/api/user', require('./routes/userRoutes.js'))
app.use('/api/admin', require('./routes/adminRoutes.js'))
app.use('/api/owner', require('./routes/ownerRoutes.js'))

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});