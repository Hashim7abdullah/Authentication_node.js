const admin = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to admin section",
  });
};
const manager = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to manager section",
  });
};
const user = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to user section",
  });
};

export { admin, manager, user };
