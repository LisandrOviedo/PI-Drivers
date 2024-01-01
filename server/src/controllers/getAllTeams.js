const { Team } = require("../db");
const axios = require("axios");

const getAllTeams = async (req, res) => {
  const URL = "http://localhost:5000/drivers";

  try {
    let apiTeams = new Set();

    const { data } = await axios(URL);

    data.forEach((driver) => {
      if (driver.teams) {
        let teamsDriver = driver.teams.split(",");
        teamsDriver.forEach((team) => apiTeams.add(team.trim()));
      }
    });

    const apiTeamsArray = [...apiTeams];

    apiTeamsArray.forEach(async (teamready) => {
      const [teamDriver, created] = await Team.findOrCreate({
        where: { name: teamready },
        defaults: {
          name: teamready,
        },
      });
    });

    const getAllTeamsDB = await Team.findAll({
      attributes: ["id", "name"],
      order: [["name", "ASC"]],
    });

    return res.json(getAllTeamsDB);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllTeams;
