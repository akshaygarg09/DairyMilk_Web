import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import createConnection from "../config/db.js";
import { createUserTable } from "../Model/UserModel.js"; // Assuming createUserTable is in the models directory
dotenv.config();
const saltRounds = 10; // Number of salt rounds for bcrypt

// Ensure that the Users table is created
(async () => {
  try {
    await createUserTable();
  } catch (error) {
    console.error("Error during initialization:", error.message);
  }
})();

export default class UserController {
  // Register a new counter_owner user
  static async registerUser(req, res) {
    let connection;
    try {
        const { codenumber, phone, password,role } = req.body;
        console.log("Incoming request to /api/register with body:", req.body);

        // Input validation
        if (!codenumber || !phone || !password) {
            return res.status(400).json({ message: "codenumber, phone, and password are required" });
        }

        const validRoles = ["counter", "collector","supplier"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ 
                message: "Invalid role", 
                validRoles: validRoles 
            });
        }

        // Create connection
        connection = await createConnection();

        // Check for existing user
        const [existingUsers] = await connection.query(
            "SELECT * FROM Users WHERE codenumber = ?",
            [codenumber]
        );

        // Log the existing users to verify
        console.log("Existing users:", existingUsers);

        // Check if user already exists
        if (existingUsers.length > 0) {
            return res.status(409).json({ message: "codenumber already exists" });
        }

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the new user into the database
        const [insertResult] = await connection.query(
            "INSERT INTO Users (codenumber, phone, password, role) VALUES (?, ?, ?, ?)",
            [codenumber, phone, hashedPassword, role]
        );

        // Generate token using the newly inserted user's ID
        const token = jwt.sign(
            { 
                codenumber: codenumber, 
                role: role 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(201).json({ 
            message: "User registered successfully",
            token: token,
            user: {
                codenumber: codenumber,
                role: role
            }
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ 
            message: "Internal server error", 
            errorDetails: error.message 
        });
    } finally {
        // Ensure connection is closed if it was opened
        if (connection) {
            await connection.end();
        }
    }
}
  // Login and generate a JWT token
 static async loginUser(req, res) {
    let connection;
    try {
      // Log the entire request body to see what's coming through
      console.log("Full request body:", req.body);

      const { codenumber, password } = req.body;

      // More detailed logging
      console.log("codenumber:", codenumber);
      console.log("Password:", password ? "***** (present)" : "not provided");

      // Input validation with more robust checking
      if (!codenumber || codenumber.trim() === '' || !password || password.trim() === '') {
        return res.status(400).json({ 
          message: "codenumber and password are required",
          receivedBody: req.body
        });
      }

      connection = await createConnection();

      // Use array destructuring with query
      const [userRows] = await connection.query(
        "SELECT * FROM Users WHERE codenumber = ?",
        [codenumber]
      );

      // Log found users
      console.log("Found users:", userRows);

      if (userRows.length === 0) {
        return res.status(401).json({ message: "Invalid codenumber or password" });
      }

      const user = userRows[0];

      // Compare the hashed password
      try {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        console.log("Password comparison result:", isPasswordValid);

        if (!isPasswordValid) {
          return res.status(401).json({ 
            message: "Invalid codenumber or password",
            debugInfo: {
              codenumberMatch: true,
              passwordValidation: false
            }
          });
        }

        // Generate a JWT token
        const token = jwt.sign(
          {  
            codenumber: user.codenumber, 
            role: user.role, 
            phone: user.phone 
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

        res.status(200).json({
          message: "Login successful",
          token,
          role: user.role
        });

      } catch (compareError) {
        console.error("Password comparison error:", compareError);
        return res.status(500).json({ 
          message: "Error during password validation",
          errorDetails: compareError.message 
        });
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ 
        message: "Internal server error",
        errorDetails: error.message 
      });
    } finally {
      // Ensure connection is closed if it was opened
      if (connection) {
        await connection.end();
      }
    }
  }

  // Verify a JWT token (middleware)
  static verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "Token required for authentication" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.codenumber; // Attach user info to request object
      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      console.error("Invalid token:", error.message);
      res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  static async registerAdmin(req, res) {
    let connection;
    try {
        const { codenumber, phone, password } = req.body;
        console.log("Incoming request to /api/register with body:", req.body);

        // Input validation
        if (!codenumber || !phone || !password) {
            return res.status(400).json({ message: "codenumber, phone, and password are required" });
        }

        // Create connection
        connection = await createConnection();

        // Check for existing user
        const [existingUsers] = await connection.query(
            "SELECT * FROM Users WHERE codenumber = ?",
            [codenumber]
        );

        // Log the existing users to verify
        console.log("Existing users:", existingUsers);

        // Check if user already exists
        if (existingUsers.length > 0) {
            return res.status(409).json({ message: "codenumber already exists" });
        }

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the new user into the database
        const [insertResult] = await connection.query(
            "INSERT INTO Users (codenumber, phone, password, role) VALUES (?, ?, ?, ?)",
            [codenumber, phone, hashedPassword, "admin"]
        );

        // Generate token using the newly inserted user's ID
        const token = jwt.sign(
            { 
                codenumber: codenumber, 
                role: "admin" 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(201).json({ 
            message: "User registered successfully",
            token: token,
            user: {
                codenumber: codenumber,
                role: "admin"
            }
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ 
            message: "Internal server error", 
            errorDetails: error.message 
        });
    } finally {
        // Ensure connection is closed if it was opened
        if (connection) {
            await connection.end();
        }
    }
}
  // Role-based access control middleware
  static authorizeRole(requiredRole) {
    return (req, res, next) => {
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: "Access denied. Insufficient permissions." });
      }
      next();
    };
  }
}


