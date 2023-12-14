// const { Favorite } = require("../DB_connection");

const getAllTeams = async (req, res) => {
  return res.json({ message: "Funciona get /teams" });
};

module.exports = getAllTeams;
