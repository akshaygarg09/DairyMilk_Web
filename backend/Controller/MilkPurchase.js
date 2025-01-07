import createConnection from "../config/db.js";
import { createMilkPurschaseTable } from "../Model/CounterModel.js";



(async () => {
    try {
      await createMilkPurschaseTable();
    } catch (error) {
      console.error("Error during initialization:", error.message);
    }
})();

export default class MilkPurchase{
    static async milk_purchase(req,res){
        let connection;
        try{
          const{counter_id,supplier_no,milk_type,quantity,fat_content,sample_no}=req.body;
          console.log("Incoming data for milk purchase:",req.body);

          if(!counter_id){
            return res.status(400).json({message:"Counter id is required"});
          };
          if(!supplier_no || !milk_type || !quantity || !fat_content || !sample_no){
            return res.status(400).json({message:"All fields are required"});
          };

          connection=await createConnection();

          await connection.query(
            "INSERT INTO Milk_Purchase (counter_id,supplier_no,milk_type,quantity,fat_content,sample_no) VALUES (?,?,?,?,?,?)",
            [counter_id,supplier_no,milk_type,quantity,fat_content,sample_no]
          );
          res.status(200).json({
            message: "success",
          });
        }
        catch(error){
          console.error("Error during milk purchase:", error.message);
          res.status(500).json({
            message: "Internal Server Error",
            errorDetails:error.message
          });
        }finally{
          if(connection) {
            connection.end();
          }  
        }
    } 
    
    static async daily_milk(req, res) {
      let connection;
      try {
        // Establish a database connection
        connection = await createConnection();
    
        // Execute the query
        const [rows] = await connection.query(
          `SELECT 
            (IFNULL(SUM(mp.quantity), 0) + IFNULL(SUM(mc.quantity), 0)) AS total_stock
          FROM 
            milk_purchase mp
          LEFT JOIN 
            milk_collection mc ON DATE(mp.created_at) = DATE(mc.created_at)
          WHERE 
            DATE(mp.created_at) = CURDATE() OR DATE(mc.created_at) = CURDATE();`
        );
    
    
        if (rows && rows.length > 0) {
          res.status(200).json({
            total_stock: rows[0].total_stock, // Use rows[0] to access the first row
          });
        } else {
          res.status(200).json({
            total_stock: 0, // Default to 0 if no rows are returned
          });
        }
      } catch (error) {
        console.error('Error executing query:', error.message);
        res.status(500).json({ error: 'Database query failed' });
      } finally {
        if (connection) {
          await connection.end(); 
        }
      }
    }
    
}