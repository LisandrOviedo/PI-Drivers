const { Driver, Team } = require("../db");
const axios = require("axios");

const getAllDrivers = async (req, res) => {
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

    const drivers_bd = await Driver.findAll({
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

    const result_bd = [];
    const result_final = [];

    for (const driver of drivers_bd) {
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

    const { data } = await axios(URL);

    if (data) {
      for (const driver_api of data) {
        const properties = {
          id: driver_api.id,
          name: driver_api.name.forename,
          last_name: driver_api.name.surname,
          description: driver_api.description,
          image: driver_api.image.url,
          nationality: driver_api.nationality,
          birthdate: driver_api.dob,
          teams: driver_api.teams,
        };

        if (!driver_api.image.url) {
          properties.image = "https://i.imgur.com/vpa5uds.png";
        }

        result.push(properties);
      }
    }

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllDrivers;
