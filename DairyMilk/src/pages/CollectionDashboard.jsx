import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";

const CollectionDashboard = () => {
  const [collections, setCollections] = useState("");
  const [milkType, setMilkType] = useState('cow');
  const [quantity, setQuantity] = useState('');
  const [fatContent, setFatContent] = useState('');

  useEffect(()=>{
    const token = localStorage.getItem('jwt_token');
    if (token){
      try{
        const decoded = jwtDecode(token);
        const collId = decoded.codenumber;
        setCollections(collId);
      }catch(error){
        toast.error("Invalid token:", error.message);
      }
    }
  },[]);

  const handleMilkPurchase = async (e) => {
    e.preventDefault();
    const purchaseData = {
      collector_id:collections,
      milk_type:milkType,
      quantity,
      fat_content:fatContent,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/milkcollection', purchaseData);
      console.log('Milk Collected:', response.data);
      toast.success('Milk Collected Successfully');
      setFatContent('');
      setQuantity('');
    } catch (error) {
      console.error('Milk purchase failed', error);
      toast.error('Milk purchase failed', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Collection Dashboard
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Milk Type
            </label>
            <select
              value={milkType}
              onChange={(e) => setMilkType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="cow">Cow</option>
              <option value="buffalo">Buffalo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Quantity (Liters)
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter quantity"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Fat Content (%)
            </label>
            <input
              type="text"
              value={fatContent}
              onChange={(e) => setFatContent(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter fat content"
            />
          </div>
          <button
            type="button"
            onClick={handleMilkPurchase}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Purchase Milk
          </button>
        </form>
      </div>
    </div>
  );
};

export default CollectionDashboard;
