import mongoose from "mongoose";

const Dbconnection = async (req, res) => {
  mongoose.connection.on("connected", () => {
    console.log("Connected to database");
  });
  await mongoose.connect(`${process.env.MONGO_URL}/NODE`);
};

export default Dbconnection; 
