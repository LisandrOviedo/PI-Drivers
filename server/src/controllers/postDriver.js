const { Driver, Team } = require("../db");

const postDriver = async (req, res) => {
  try {
    const {
      name,
      last_name,
      description,
      image,
      nationality,
      birthdate,
      teams,
    } = req.body;

    if (name && last_name && description && image && nationality && birthdate) {
      const driver = await Driver.create({
        name: name,
        last_name: last_name,
        description: description,
        image: image,
        nationality: nationality,
        birthdate: birthdate,
      });

      return res.status(201).json(driver);
    }

    return res.status(400).json({ error: "Faltan datos" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postDriver;
