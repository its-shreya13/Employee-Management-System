const Employee = require("../model/Employee"); 
const multer = require("multer");
const path = require("path");
const fs = require("fs"); 


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), 
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`), 
});
const upload = multer({ storage });


exports.upload = upload.single("photo");


exports.createEmployee = async (req, res) => {
  try {
    const {
      empId,
      firstName,
      middleName,
      lastName,
      fullName,
      dob,
      sex,
      age,
      emailId,
      phoneNo,
      panCardNo,
      dateOfJoining,
      department,
    } = req.body;

    // uploading of photo
    const photo = req.file ? req.file.path : null;

   
    const newEmployee = new Employee({
      empId,
      firstName,
      middleName,
      lastName,
      fullName,
      dob,
      sex,
      age,
      emailId,
      phoneNo,
      panCardNo,
      dateOfJoining,
      department,
      photo,
    });

    await newEmployee.save();

    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { empId } = req.params;

    
    const employee = await Employee.findOne({ empId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    
    if (employee.photo) {
      fs.unlink(employee.photo, (err) => {
        if (err) {
          console.error("Error deleting photo:", err.message);
        } else {
          console.log("Photo deleted successfully");
        }
      });
    }

    await Employee.deleteOne({ empId });

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
