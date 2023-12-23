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
          teams: data.teams,
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
        const resultado_bd = [];
        resultado_bd.push(driver_bd);

        const teams_join = [];

        for (const driver of resultado_bd) {
          driver.Teams.forEach((element) => {
            teams_join.push(element.name);
          });
        }

        const driver_bd_resultado = {
          id: resultado_bd[0].id,
          name: resultado_bd[0].name,
          last_name: resultado_bd[0].last_name,
          description: resultado_bd[0].description,
          image: resultado_bd[0].image,
          nationality: resultado_bd[0].nationality,
          birthdate: resultado_bd[0].birthdate,
          teams: teams_join.join(", "),
        };

        return res.json(driver_bd_resultado);
      }
      return res.status(404).json({ error: "Driver not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getDriverByID;
