// const { Favorite } = require("../DB_connection");

const getDriverByID = async (req, res) => {
  const { idDriver } = req.params;
  return res.json({ message: `Funciona get /drivers/${idDriver}` });
};

module.exports = getDriverByID;
