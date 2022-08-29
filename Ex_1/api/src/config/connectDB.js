const Mongoose = require("mongoose");

// Connect to mongodb
const URI = process.env.MONGODB_URL;
Mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);
module.exports = Mongoose;
