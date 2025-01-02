import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import UserController from "./Controller/UserController.js";
import MilkPurchase from "./Controller/MilkPurchase.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));// Parse incoming JSON requests

// Register routes
app.post("/api/register", UserController.registerUser);
app.post("/api/login", UserController.loginUser);
app.post("/api/adminregister",UserController.registerAdmin);
app.post("/api/milkpurchase",MilkPurchase.milk_purchase);

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
