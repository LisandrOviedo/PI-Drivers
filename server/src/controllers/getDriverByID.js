const { Driver, Team } = require("../db");
const axios = require("axios");

const getDriverByID = async (req, res) => {
  const { idDriver } = req.params;
  const URL = `http://localhost:5000/drivers/${idDriver}`;

  try {
    if (idDriver > 0 && idDriver <= 508) {
      const { data } = await axios(URL);

      if (data) {
        const driver_api = {
          id: data.id,
          name: data.name.forename,
          last_name: data.name.surname,
          description: data.description,
          image: data.image.url,
          nationality: data.nationality,
          birthdate: data.dob,
        };
        return res.json(driver_api);
      }
    } else {
      const driver_bd = await Driver.findByPk(idDriver, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Team,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (driver_bd) {
        return res.json(driver_bd);
      }
      return res.status(404).json({ error: "Driver not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getDriverByID;
