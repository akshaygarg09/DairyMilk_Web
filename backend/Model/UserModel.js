import createConnection from "../config/db.js";

export const createUserTable = async () => {
  // Establish a connection to the database
  const connection = await createConnection();

  // SQL query to create the Users table if it does not exist
  const query = `
    CREATE TABLE IF NOT EXISTS Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(15) NOT NULL UNIQUE, -- Updated data type
      role ENUM('admin', 'counter','collector') NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  try {
    // Execute the query
    await connection.execute(query);
    console.log("Users table created or already exists.");
  } catch (error) {
    // Log errors if any occur
    console.error("Error creating Users table:", error.message);
  } finally {
    // Ensure the database connection is closed
    await connection.end();
  }
};
