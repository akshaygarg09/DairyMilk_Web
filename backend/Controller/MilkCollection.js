import createConnection from "../config/db.js";
import { createCollectorTable } from "../Model/CollectorModel.js";

(async () => {
    try {
      await createCollectorTable();
    } catch (error) {
      console.error("Error during initialization:", error.message);
    }
})();

export default class MilkCollect{
    static async milk_collect(req,res){
        let connection;
        try {
            const{collector_id,milk_type,quantity,fat_content}=req.body;
            console.log("Incoming data for milk purchase:",req.body);

            if(!collector_id){
                return res.status(400).json({message:"Counter id is required"});
            };
            if( !milk_type || !quantity || !fat_content ){
                return res.status(400).json({message:"All fields are required"});
            };

            connection=await createConnection();

            await connection.query(
                "INSERT INTO Milk_collection (collector_id,milk_type,quantity,fat_content) VALUES (?,?,?,?)",
                [collector_id,milk_type,quantity,fat_content]
              );
              res.status(200).json({
                message: "success",
              });
            }
            catch(error){
                console.error("Error during milk collection:", error.message);
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