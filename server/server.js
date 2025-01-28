require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const connectDB = require("./db/db");
const authRoutes = require("./routes/routes");
const crypto = require('crypto');
const cors = require('cors');



const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // change to ur frontend url
    credentials: true, 
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));


app.use("/api/auth", authRoutes);


const generateJWTSecret = () => {
   return crypto.randomBytes(64).toString('hex');
 };
 
 const secret = generateJWTSecret(); 
 console.log(`JWT Secret: ${secret}`);
 


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});


