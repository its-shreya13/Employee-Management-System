const Task = require("../model/Task");
const Employee = require("../model/Employee");


const saveTask = async (req, res) => {
  const { empId, taskDescription, startDate, dueDate } = req.body;

  try {
   
    const employee = await Employee.findOne({ empId: Number(empId) });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    
    const task = new Task({
      employee: employee._id, // link to emp objectid
      taskDescription,
      startDate: new Date(startDate),
      dueDate: new Date(dueDate),
    });

    await task.save();

    res.status(201).json({ message: "Task assigned successfully", task });
  } catch (error) {
    console.error("Error saving task:", error);
    res.status(500).json({ error: "Failed to save task" });
  }
};

const getEmployeeByEmpId = async (req, res) => {
   const { empId } = req.params;
 
   try {
     const employee = await Employee.findOne({ empId: Number(empId) });
 
     if (!employee) {
       return res.status(404).json({ message: "Employee not found" });
     }
 
     res.status(200).json(employee);
   } catch (error) {
     console.error("Error fetching employee:", error);
     res.status(500).json({ error: "Failed to fetch employee" });
   }
 };
 

module.exports = { saveTask,getEmployeeByEmpId };
