const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

   
    if (email === "adminOBP@gmail.com" && password === "obp@admin246") {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(200)  
        .cookie('token', token, {
          httpOnly: true, 
          secure: false, 
          sameSite: 'Strict', 
          maxAge: 3600000, 
        })
        .json({
          message: "Admin login successful",
          token,
          user: {
            id: "admin_id", 
            name: "admin",
            role: "admin"
          }
        });
    }

  
    let user = await User.findOne({ email });

    if (!user) {
     
      const hashedPassword = await bcrypt.hash(password, 10);

      user = new User({
        email,
        password: hashedPassword, 
      });

      await user.save(); 
    } else {
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }

    // Generate a token for the user
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict",
        maxAge: 3600000, // 1 hour
      })
      .json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: "user",
          role: "user"
        }
      });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


const dashboard = async (req, res) => {
 
  res.status(200).json({ message: "Welcome to the dashboard!" });
};

module.exports = { login, dashboard };
