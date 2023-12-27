const { User } = require("../db");

const postUser = async (req, res) => {
  const { email, password } = req.body;

  const emailLower = email.toLowerCase();

  if (!email || !password) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    const [user, created] = await User.findOrCreate({
      where: { email: emailLower },
      defaults: { password },
    });

    if (!created) {
      return res.status(409).json({ error: "The email is already registered" });
    }
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postUser;
