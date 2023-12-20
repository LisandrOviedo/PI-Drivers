const { Team } = require("../db");
const axios = require("axios");

const getAllTeams = async (req, res) => {
  const URL = "http://localhost:5000/drivers";

  try {
    let apiTeams = new Set(); // Para guardar todos los teams sin duplicidad

    const { data } = await axios(URL);

    data.forEach((driver) => {
      if (driver.teams) {
        let teamsDriver = driver.teams.match(/\b([\.A-Za-z\s])+\b/g);
        teamsDriver.forEach((team) => apiTeams.add(team));
      }
    });

    const apiTeamsArray = [...apiTeams];

    const arrayReady = apiTeamsArray.map((team) => ({ name: team }));
    await Team.bulkCreate(arrayReady);

    const getAllTeamsDB = await Team.findAll({
      attributes: ["name"],
    });

    return res.json(getAllTeamsDB);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllTeams;
