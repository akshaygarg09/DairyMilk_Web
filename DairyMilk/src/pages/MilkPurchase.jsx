import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";


const MilkPurchase = () => {
  const [count,setCount]=useState("");
  const [codeNo, setCodeNo] = useState("");
  const [milkType, setMilkType] = useState("Buffalo");
  const [quantity, setQuantity] = useState("");
  const [fat, setFat] = useState("");
  const [sampleNo, setSampleNo] = useState("");

  useEffect(()=>{
    const token = localStorage.getItem("jwt_token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the JWT token
        const numb = decodedToken.codenumber; // Extract codenumber
        console.log(numb);
        setCount(numb); // Set the counter ID
      } catch (error) {
        toast.error("Invalid token:",error.message);
      }
    }
  },[]);

  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/milkpurchase", {
        counter_id:count,
        supplier_no:codeNo,
        milk_type:milkType,
        quantity,
        fat_content:fat,
        sample_no:sampleNo,
      });
      const {message} =response.data;
      if (message ==="success") {
        toast.success("Milk purchased successfully");

        setCodeNo('');
        setQuantity('');
        setFat('');
        setSampleNo('');
      } else {
        toast.error("Purchase failed");
      }
    } catch (err) {
      toast.error("Error during milk purchase");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handlePurchase}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Milk Purchase
        </h2>
        <div className="mb-4">
          <label
            htmlFor="codeNo"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Supplier's CodeNumber
          </label>
          <input
            type="text"
            id="codeNo"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Supplier's CodeNumber"
            value={codeNo}
            onChange={(e) => setCodeNo(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="milkType"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Milk Type
          </label>
          <select
            id="milkType"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={milkType}
            onChange={(e) => setMilkType(e.target.value)}
          >
            <option value="Buffalo">Buffalo</option>
            <option value="Cow">Cow</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Quantity (liters)
          </label>
          <input
            type="number"
            id="quantity"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="fat"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Fat Content (%)
          </label>
          <input
            type="number"
            id="fat"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Fat Content"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="sampleNo"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Sample Number
          </label>
          <input
            type="text"
            id="sampleNo"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Sample Number"
            value={sampleNo}
            onChange={(e) => setSampleNo(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Purchase
        </button>
      </form>
    </div>
  );
};

export default MilkPurchase;
