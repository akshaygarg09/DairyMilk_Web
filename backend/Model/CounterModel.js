import createConnection from "../config/db.js";

export const createMilkPurschaseTable = async () => {
  // Establish a connection to the database
  const connection = await createConnection();

  // SQL query to create the Users table if it does not exist
  const query = `
    CREATE TABLE IF NOT EXISTS Milk_Purchase (
      counter_id VARCHAR(255) ,  
      supplier_no VARCHAR(255),
      milk_type ENUM('Buffalo', 'Cow') NOT NULL,
      quantity FLOAT NOT NULL CHECK (quantity >= 0),
      fat_content FLOAT NOT NULL CHECK (fat_content >= 0 AND fat_content <= 100),
      sample_no VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (counter_id) REFERENCES users(codenumber) ON UPDATE CASCADE ON DELETE SET NULL
    );
  `;

  try {
    // Execute the query
    await connection.execute(query);
    console.log("Milk Purchase table created or already exists.");
  } catch (error) {
    // Log errors if any occur
    console.error("Error creating Users table:", error.message);
  } finally {
    // Ensure the database connection is closed
    await connection.end();
  }
};
