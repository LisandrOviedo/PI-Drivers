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

    if (
      name &&
      last_name &&
      description &&
      image &&
      nationality &&
      birthdate &&
      teams
    ) {
      const newDriver = await Driver.create({
        name,
        last_name,
        description,
        image,
        nationality,
        birthdate,
      });

      const teamSplit = teams.split(", ");

      for (let i = 0; i < teamSplit.length; i++) {
        let searchTeam = await Team.findOne({
          where: { name: teamSplit[i] },
        });

        await newDriver.addTeam(searchTeam);
      }

      return res.status(201).json(newDriver);
    }

    return res.status(400).json({ error: "Missing data" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postDriver;
