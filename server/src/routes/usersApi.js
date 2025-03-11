const express = require("express")

const userControllers = require("../controllers/usersController");
const { VerifyToken } = require("../middlewares/VerifyToken");



const router = express.Router();


router.post("/registration", userControllers.Registration);
router.post("/login", userControllers.Login);
router.put("/update-profile/:uid", VerifyToken, userControllers.UpdateProfile);
// router.get("/logout", userControllers.LogOut)





module.exports = router;