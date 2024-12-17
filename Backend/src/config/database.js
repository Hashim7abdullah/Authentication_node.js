
import mongoose from "mongoose";

const Dbconnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI,);
    console.log('MongoDB connected successfully');
    return connect.connection.getClient();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Exit process with failure
    process.exit(1);
  }
};


export default Dbconnection;