const { Driver } = require("../db");
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
        where: { name: name },
        limit: 15,
        attributes: [
          "id",
          "name",
          "last_name",
          "description",
          "image",
          "nationality",
          "birthdate",
        ],
      });

      if (driversByName) {
        for (const element of driversByName) {
          result.push(element);
        }
      }

      if (result.length < 15) {
        let aux = 15 - result.length;

        const { data } = await axios(URL);

        if (data) {
          for (let i = 0; i < aux; i++) {
            if (data[i].name.forename.toLowerCase() == name.toLowerCase()) {
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
