const router = require("express").Router();
const { consult } = require("../controllers/consult.controller");

router.post("/", consult);

module.exports = router;
