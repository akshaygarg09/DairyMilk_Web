import dotenv from "dotenv";
import createConnection from "../config/db.js";
import { createMilkPurschaseTable } from "../Model/CounterModel.js";

dotenv.config();

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
}