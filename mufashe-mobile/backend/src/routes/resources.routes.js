const router = require("express").Router();
const { listResources, seedResources } = require("../controllers/resources.controller");

router.get("/", listResources);
router.post("/seed", seedResources); // optional, for MVP data

module.exports = router;
