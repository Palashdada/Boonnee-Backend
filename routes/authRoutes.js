const authControlar = require("../controollers/authControlar");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/admin-login", authControlar.admin_login);
router.get("/get-user", authMiddleware, authControlar.getUser);
module.exports = router;
