// const { Favorite } = require("../DB_connection");

const getDriverByName = async (req, res) => {
  return res.json({ message: "Funciona get /drivers/name?" });
};

module.exports = getDriverByName;
