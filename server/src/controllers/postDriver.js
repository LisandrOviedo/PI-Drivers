// const { Favorite } = require("../DB_connection");

const postDriver = async (req, res) => {
  return res.json({ message: "Funciona post /drivers" });
};

module.exports = postDriver;
