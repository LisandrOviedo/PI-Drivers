// const { Favorite } = require("../DB_connection");

const getAllDrivers = async (req, res) => {
  return res.json({ message: "Funciona get /drivers" });
};

module.exports = getAllDrivers;
