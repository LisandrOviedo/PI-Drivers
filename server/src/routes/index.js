const { Router } = require("express");

const router = Router();

router.get("/drivers", (req, res) => {
  return res.json({ message: "Funciona get /drivers" });
});
router.get("/drivers/:idDriver", (req, res) => {
  const { idDriver } = req.params;
  return res.json({ message: `Funciona get /drivers/${idDriver}` });
});
router.get("/drivers/name?", (req, res) => {
  return res.json({ message: "Funciona get /drivers/name?" });
});

router.post("/drivers", (req, res) => {
  return res.json({ message: "Funciona post /drivers" });
});

router.get("/teams", (req, res) => {
  return res.json({ message: "Funciona get /teams" });
});

module.exports = router;
