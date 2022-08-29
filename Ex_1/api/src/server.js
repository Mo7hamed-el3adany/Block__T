require("dotenv").config();
const express = require("express");
const connectionDB = require("./config/connectDB.js");
const app = express();
app.use(express.json());
// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the BlackStone Exercise 1 " });
});
app.use("/api", require("./routes/itemRouter"));
app.all("*", (req, res) => {
  res.status(404).json({ msg: "404 | This endpoint not found" });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
