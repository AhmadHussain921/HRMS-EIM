const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/temp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected ", conn.connection.host);
  } catch (e) {
    console.log("DB error", e);
  }
};
module.exports = { connectDB };
