const express = require("express")

const taskControllers = require("../controllers/tasksController");
const { VerifyToken } = require("../middlewares/VerifyToken");



const router = express.Router();


router.post("/create-task", VerifyToken, taskControllers.CreateTask);
router.get("/update-task-status/:tid/:taskStatus", VerifyToken, taskControllers.UpdatetaskStatus);
router.delete("/delete-task/:tid", VerifyToken, taskControllers.DeleteTask);
router.get("/list-task-by-status/:statuss", VerifyToken, taskControllers.ListTaskByStatus);
router.get("/count-total-number-by-task-status", VerifyToken, taskControllers.CountTotalNumberByTaskStatus);






module.exports = router; 