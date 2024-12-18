import mongoose from "mongoose";

const userData = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
  },
});

const userDatas = mongoose.model("User Data", userData);
export default userDatas;