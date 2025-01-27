const Employee = require("../model/Employee");


const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    console.log("Employees fetched:", employees);
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Failed to fetch employees." });
  }
};

const saveRatings = async (req, res) => {
  const ratings = req.body;

  try {
    for (const employeeId in ratings) {
      const rating = ratings[employeeId];
      await Employee.findByIdAndUpdate(employeeId, {
        $set: {
          quality: rating.quality,
          productivity: rating.productivity,
          timeManagement: rating.timeManagement,
          adaptability: rating.adaptability,
          collaboration: rating.collaboration,
        },
      });
    }
    res.status(200).json({ message: "Ratings saved successfully" });
  } catch (error) {
    console.error("Error saving ratings:", error.message);
    res.status(500).json({ message: "Failed to save ratings" });
  }
};
module.exports = { getEmployees,saveRatings };
