const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected ", conn.connection.host);
  } catch (e) {
    console.log("DB error", e);
  }
};
const disconnectDB = async () => {
  await mongoose.connection.close();
};
module.exports = { connectDB, disconnectDB };

