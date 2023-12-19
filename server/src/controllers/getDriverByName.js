const { Driver } = require("../db");

const getDriverByName = async (req, res) => {
  const { name } = req.query;
  const URL = "http://localhost:5000/drivers";

  try {
    const result = [];
    let properties = {};

    const { data } = await axios(URL);

    if (data) {
      for (const driver_api of data) {
        if (result.length < 15) {
          if (driver_api.name.forename.toLowerCase() === name.toLowerCase()) {
            properties = {
              id: driver_api.id,
              name: driver_api.name.forename,
              last_name: driver_api.name.surname,
              description: driver_api.description,
              image: driver_api.image.url,
              nationality: driver_api.nationality,
              birthdate: driver_api.dob,
            };
          }
          if (!driver_api.image.url) {
            properties.image = "https://i.imgur.com/vpa5uds.png";
          }

          result.push(properties);
        }
      }
    }

    if (result.length - 15 === 0) {
      return res.json(result);
    } else {
      const driversByName = Driver.findAndCountAll({
        include: [{ name: name }],
        limit: result.length - 15,
      });

      if (driversByName) {
        result.push(driversByName);
      }
      return res.json(result);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getDriverByName;
