const express = require("express");
const { login, dashboard } = require("../controllers/authController");
const { createEmployee, upload,deleteEmployee } = require("../controllers/employeeController");
const { getEmployees,saveRatings} = require("../controllers/empListContoller");
const authMiddleware = require("../middleware/auth");
const { saveTask,getEmployeeByEmpId  } = require("../controllers/taskController");
const { getTasks, updateTask, deleteTask } = require("../controllers/taskListController");


const router = express.Router();

router.post("/login", login);
router.get("/dashboard", authMiddleware, dashboard);
router.post("/employees", upload, createEmployee);
router.get("/employee-list", getEmployees);
router.post("/save-task", saveTask);
router.get("/employee/:empId", getEmployeeByEmpId);
router.get("/tasks", getTasks);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);
router.post("/save-ratings", saveRatings);
router.delete("/employee/:empId",deleteEmployee);

module.exports = router;
