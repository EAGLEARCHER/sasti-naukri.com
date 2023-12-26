require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// Database connection file/function
const database = require("./db/connect");

// Importing routes files
const authRoute = require("./routes/auth-route");
const jobsRoute = require("./routes/jobs-route");

// Middleware for parsing JSON request bodies
app.use(express.json());

// Routes
app.use("/auth", authRoute);
app.use("/jobs", jobsRoute);

// Error handling middleware
const notFoundMiddleware = require("./middleware/route-not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Default route
app.get("/", (req, res) => {
  res.send("jobs api");
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await database(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
