const emptyBody = () => {
  return async (req, res) => {
    if (req.method === "PUT" && Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }
  };
};

module.exports = emptyBody;
