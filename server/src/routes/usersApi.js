const express = require("express")

const userControllers = require("../controllers/usersController");
const { VerifyToken } = require("../middlewares/VerifyToken");
const { SingleUpload } = require("../middlewares/multer");



const router = express.Router();


router.post("/registration", userControllers.Registration);
router.post("/login", userControllers.Login);
router.put("/update-profile/:uid", VerifyToken, SingleUpload, userControllers.UpdateProfile);
router.get("/logout", userControllers.LogOut)





module.exports = router;