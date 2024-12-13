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
        const { username, phone, password,role } = req.body;
        console.log("Incoming request to /api/register with body:", req.body);

        // Input validation
        if (!username || !phone || !password) {
            return res.status(400).json({ message: "Username, phone, and password are required" });
        }

        const validRoles = ["counter", "collector"];
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
            "SELECT * FROM Users WHERE username = ?",
            [username]
        );

        // Log the existing users to verify
        console.log("Existing users:", existingUsers);

        // Check if user already exists
        if (existingUsers.length > 0) {
            return res.status(409).json({ message: "Username already exists" });
        }

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the new user into the database
        const [insertResult] = await connection.query(
            "INSERT INTO Users (username, phone, password, role) VALUES (?, ?, ?, ?)",
            [username, phone, hashedPassword, role]
        );

        // Generate token using the newly inserted user's ID
        const token = jwt.sign(
            { 
                username: username, 
                role: role 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(201).json({ 
            message: "User registered successfully",
            token: token,
            user: {
                username: username,
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

      const { username, password } = req.body;

      // More detailed logging
      console.log("Username:", username);
      console.log("Password:", password ? "***** (present)" : "not provided");

      // Input validation with more robust checking
      if (!username || username.trim() === '' || !password || password.trim() === '') {
        return res.status(400).json({ 
          message: "Username and password are required",
          receivedBody: req.body
        });
      }

      connection = await createConnection();

      // Use array destructuring with query
      const [userRows] = await connection.query(
        "SELECT * FROM Users WHERE username = ?",
        [username]
      );

      // Log found users
      console.log("Found users:", userRows);

      if (userRows.length === 0) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const user = userRows[0];

      // Compare the hashed password
      try {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        console.log("Password comparison result:", isPasswordValid);

        if (!isPasswordValid) {
          return res.status(401).json({ 
            message: "Invalid username or password",
            debugInfo: {
              usernameMatch: true,
              passwordValidation: false
            }
          });
        }

        // Generate a JWT token
        const token = jwt.sign(
          { 
            id: user.id, 
            username: user.username, 
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
      req.user = decoded; // Attach user info to request object
      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      console.error("Invalid token:", error.message);
      res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  static async registerAdmin(req, res) {
    let connection;
    try {
        const { username, phone, password } = req.body;
        console.log("Incoming request to /api/register with body:", req.body);

        // Input validation
        if (!username || !phone || !password) {
            return res.status(400).json({ message: "Username, phone, and password are required" });
        }

        // Create connection
        connection = await createConnection();

        // Check for existing user
        const [existingUsers] = await connection.query(
            "SELECT * FROM Users WHERE username = ?",
            [username]
        );

        // Log the existing users to verify
        console.log("Existing users:", existingUsers);

        // Check if user already exists
        if (existingUsers.length > 0) {
            return res.status(409).json({ message: "Username already exists" });
        }

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the new user into the database
        const [insertResult] = await connection.query(
            "INSERT INTO Users (username, phone, password, role) VALUES (?, ?, ?, ?)",
            [username, phone, hashedPassword, "admin"]
        );

        // Generate token using the newly inserted user's ID
        const token = jwt.sign(
            { 
                username: username, 
                role: "admin" 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(201).json({ 
            message: "User registered successfully",
            token: token,
            user: {
                username: username,
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


