import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())




//routes import
import userRouter from "./routes/User.routes.js"
import itemRoutes from "./routes/Item.routes.js"
import claimRoutes from "./routes/Claim.routes.js"
import adminRoutes from "./routes/admin.routes.js"


// //routes declaration

app.use("/api/v1/users", userRouter)
app.use("/api/v1/items", itemRoutes)
app.use("/api/v1/claims", claimRoutes)
app.use("/api/v1/admin", adminRoutes)


// // http://localhost:8000/api/v1/users/register
// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error("Error middleware:", err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});


export { app }