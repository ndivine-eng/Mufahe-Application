const router = require("express").Router();

const { register, login, me } = require("../controllers/auth.controller");
const auth = require("../middleware/auth");

// ✅ Google controller import 
const { googleLogin } = require("../controllers/googleAuth.controller");

router.post("/register", register);
router.post("/login", login);

// ✅ Google endpoint
router.post("/google", googleLogin);

router.get("/me", auth, me);

module.exports = router;
