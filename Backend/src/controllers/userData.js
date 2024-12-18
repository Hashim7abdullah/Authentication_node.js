import userDatas from "../models/userData.js";
const userData = async (req, res) => {
  userDatas
    .create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

const fetchdata = async (req, res) => {
  userDatas
    .find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

const updateData = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const userId = req.params.id; 

    
    const updatedUser = await userDatas.findByIdAndUpdate(
      userId, 
      { name, email, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err });
  }
};

export { userData, fetchdata , updateData };
