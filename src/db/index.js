const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DATABASE_URL}`
    );
    console.log(`MongoDB connected:${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Error:${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
