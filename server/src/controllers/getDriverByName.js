const { Driver, Team } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");

const getDriverByName = async (req, res) => {
  const { name } = req.query;
  const URL = "http://localhost:5000/drivers";

  try {
    const result = [];

    await Driver.update(
      { image: "https://i.imgur.com/vpa5uds.png" },
      {
        where: {
          image: null,
        },
      }
    );

    if (name) {
      const driversByName = await Driver.findAll({
        where: {
          name: { [Op.like]: `%${name}%` },
        },
        limit: 15,
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

      if (driversByName) {
        const resultado_bd = [];

        const resultado_finalxd = [];

        for (const driver of driversByName) {
          resultado_bd.push(driver);
        }

        for (const driver of resultado_bd) {
          const teams_join = [];

          driver.Teams.forEach((team) => {
            teams_join.push(team.name);
          });

          const driver_bd_resultado = {
            id: driver.id,
            name: driver.name,
            last_name: driver.last_name,
            description: driver.description,
            image: driver.image,
            nationality: driver.nationality,
            birthdate: driver.birthdate,
            teams: teams_join.join(", "),
          };

          resultado_finalxd.push(driver_bd_resultado);
        }

        resultado_finalxd.forEach((element) => {
          result.push(element);
        });
      }

      const { data } = await axios(URL);

      if (data) {
        for (let i = 0; i < data.length; i++) {
          if (result.length < 15) {
            if (
              data[i].name.forename.toLowerCase().startsWith(name.toLowerCase())
            ) {
              let properties = {
                id: data[i].id,
                name: data[i].name.forename,
                last_name: data[i].name.surname,
                description: data[i].description,
                image: data[i].image.url,
                nationality: data[i].nationality,
                birthdate: data[i].dob,
                teams: data[i].teams,
              };
              if (!data[i].image.url) {
                properties.image = "https://i.imgur.com/vpa5uds.png";
              }

              result.push(properties);
            }
          } else {
            break;
          }
        }
      }
      return res.json(result);
    }
    return res.status(400).json({ error: "Missing data" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getDriverByName;
