const { Driver } = require("../db");

const getDriverByName = async (req, res) => {
  const { name } = req.query;
  const URL = "http://localhost:5000/drivers";

  try {
    let result = [];

    const driversByName = Driver.findAndCountAll({
      where: { name: [name] },
      limit: 15,
    });

    if (driversByName) {
      for (const element of driversByName) {
        result.push(element);
      }
    }

    while (result.length < 15) {
      const { data } = await axios(URL);

      if (data) {
        for (let element of data) {
          if (element.name.forename.toLowerCase() == name.toLowerCase()) {
            let properties = {
              id: element.id,
              name: element.name.forename,
              last_name: element.name.surname,
              description: element.description,
              image: element.image.url,
              nationality: element.nationality,
              birthdate: element.dob,
              teams: element.teams,
            };
            if (!element.image.url) {
              properties.image = "https://i.imgur.com/vpa5uds.png";
            }

            result.push(properties);
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
