const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  empId:{type: Number, required:true,unique: true},
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  fullName: { type: String },
  dob: { type: Date, required: true },
  sex: { type: String, enum: ["Male", "Female", "Others"], required: true },
  age: { type: Number, required: true },
  emailId: { type: String, required: true, unique: true },
  phoneNo: { type: String, required: true, unique: true },
  panCardNo: { type: String, required: true, unique: true },
  dateOfJoining: { type: Date, required: true },
  department: { type: String, required: true },
  photo: { type: String },
  quality: { type: Number, default: 0 },
  productivity: { type: Number, default: 0 },
  timeManagement: { type: Number, default: 0 },
  adaptability: { type: Number, default: 0 },
  collaboration: { type: Number, default: 0 },
});

module.exports = mongoose.model("Employee", employeeSchema);
