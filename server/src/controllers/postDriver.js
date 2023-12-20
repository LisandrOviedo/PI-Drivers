const { Driver } = require("../db");

const postDriver = async (req, res) => {
  try {
    const { id, name, last_name, description, image, nationality, birthdate } =
      req.body;

    // const [driver, created] = await Driver.findOrCreate({
    //   where: { id: id },
    //   defaults: {
    //     id: id,
    //     name: name,
    //     last_name: last_name,
    //     description: description,
    //     image: image,
    //     nationality: nationality,
    //     birthdate: birthdate,
    //   },
    // });

    const conductor = {
      id: id,
      name: name,
      last_name: last_name,
      description: description,
      image: image,
      nationality: nationality,
      birthdate: birthdate,
    };

    await Driver.create(
      {
        id: 1,
        title: "Chair",
        tags: [{ name: "Alpha" }, { name: "Beta" }],
      },
      {
        include: [Tag],
      }
    );

    if (!created) {
      return res.status(400).json({ error: "El driver no pudo registrarse" });
    }

    return res.status(201).json(driver);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postDriver;
