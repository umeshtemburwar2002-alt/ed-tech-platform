const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const { cloudinaryConnect } = require("./config/cloudinary");
const errorHandler = require("./middleware/errorHandler");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const adminRoutes = require("./routes/Admin");
const supportRoutes = require("./routes/Support");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// --------------- Security & Utility Middleware ---------------

app.use(helmet());

app.use(
  morgan(process.env.NODE_ENV === "production" ? "combined" : "dev")
);

const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
  })
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api/", apiLimiter);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// --------------- External Services ---------------

cloudinaryConnect();

// --------------- Routes ---------------

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/support", supportRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// --------------- Error Handler (must be last) ---------------

app.use(errorHandler);

// --------------- Start ---------------

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
