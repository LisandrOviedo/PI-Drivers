const { Driver } = require("../db");
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

    const drivers_bd = await Driver.findAll();

    for (const driver_bd of drivers_bd) {
      result.push(driver_bd);
    }

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
