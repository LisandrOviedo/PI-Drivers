const { Driver } = require("../db");

const getDriverByName = async (req, res) => {
  const { name } = req.query;
  const URL = "http://localhost:5000/drivers";

  try {
    const result = [];

    const { data } = await axios(URL);

    if (data) {
      for (let element of data) {
        if (result.length < 15) {
          if (element.name.forename.toLowerCase() == name.toLowerCase()) {
            let properties = {
              id: element.id,
              name: element.name.forename,
              last_name: element.name.surname,
              description: element.description,
              image: element.image.url,
              nationality: element.nationality,
              birthdate: element.dob,
            };
            if (!element.image.url) {
              properties.image = "https://i.imgur.com/vpa5uds.png";
            }

            result.push(properties);
          }
        } else {
          break;
        }
      }
    }

    if (result.length - 15 == 0) {
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
