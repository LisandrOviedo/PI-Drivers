const { User } = require("../db");

const getLogin = async (req, res) => {
  const { email, password } = req.query;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user || user.email !== email || user.password !== password) {
      return res.status(403).json({ error: "Incorrect email or password" });
    }

    return res.json({
      access: true,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getLogin;
