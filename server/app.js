import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

// DB
import connectDB from "./db/connectDB.js"

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Routers
import productsRouter from "./routes/products.js"

// Routes
app.use("/api/v1/products", productsRouter)

// PORT
const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  } catch (error) {
    console.error(error)
  }
}

start()
