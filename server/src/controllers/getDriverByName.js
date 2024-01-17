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
          name: { [Op.iLike]: `%${name}%` },
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
        const result_bd = [];

        const result_final = [];

        for (const driver of driversByName) {
          result_bd.push(driver);
        }

        for (const driver of result_bd) {
          const teams_join = [];

          driver.Teams.forEach((team) => {
            teams_join.push(team.name);
          });

          const driver_bd_result = {
            id: driver.id,
            name: driver.name,
            last_name: driver.last_name,
            description: driver.description,
            image: driver.image,
            nationality: driver.nationality,
            birthdate: driver.birthdate,
            teams: teams_join.join(", "),
          };

          result_final.push(driver_bd_result);
        }

        result_final.forEach((element) => {
          result.push(element);
        });
      }

      if (result.length < 15) {
        const { data } = await axios(URL);

        if (data) {
          for (let i = 0; i < data.length; i++) {
            if (result.length < 15) {
              if (
                data[i].name.forename
                  .toLowerCase()
                  .startsWith(name.toLowerCase())
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
      }
    }
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getDriverByName;
