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

export { userData, fetchdata };
