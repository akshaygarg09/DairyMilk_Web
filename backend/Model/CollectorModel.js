import createConnection from "../config/db.js";

export const createCollectorTable = async() =>{
    const connection=await createConnection();

    const query=`
    CREATE TABLE IF NOT EXISTS Milk_collection(
    collector_id VARCHAR(255) NOT NULL,
    milk_type ENUM('Buffalo','Cow') NOT NULL,
    quantity FLOAT NOT NULL CHECK (quantity >= 0),
    fat_content FLOAT NOT NULL CHECK (fat_content >= 0 AND fat_content <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (collector_id) REFERENCES users(codenumber) ON UPDATE CASCADE ON DELETE CASCADE
    );
    `;
    try {
        // Execute the query
        await connection.execute(query);
        console.log("Milk Collection table created or already exists.");
      } catch (error) {
        // Log errors if any occur
        console.error("Error creating Users table:", error.message);
      } finally {
        // Ensure the database connection is closed
        await connection.end();
      }
    };
