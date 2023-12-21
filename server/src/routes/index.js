const { Router } = require("express");
const getAllDrivers = require("../controllers/getAllDrivers");
const getDriverByID = require("../controllers/getDriverByID");
const getDriverByName = require("../controllers/getDriverByName");
const postDriver = require("../controllers/postDriver");
const getAllTeams = require("../controllers/getAllTeams");

const router = Router();

// Routes GET
router.get("/", getAllDrivers);
router.get("/drivers/:idDriver", getDriverByID);
router.get("/drivers", getDriverByName);
router.get("/teams", getAllTeams);

// Routes POST
router.post("/drivers", postDriver);

module.exports = router;
