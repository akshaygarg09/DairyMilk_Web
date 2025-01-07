import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [dailyTransactions, setDailyTransactions] = useState(0);
  const [monthlyTransactions, setMonthlyTransactions] = useState([]);
  const [milkSellingData, setMilkSellingData] = useState([]);
  const [milkPurchasingData, setMilkPurchasingData] = useState([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [supplierReport, setSupplierReport] = useState(null);
  const [dailyMilkSales, setDailyMilkSales] = useState(0);

  useEffect(() => {
    fetchDailyTransactions();
    fetchMilkData();
    fetchDailyMilkSales();
  }, []);

  const fetchDailyTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/dailypurchase");
      console.log("Response:", response.data); // Log the response data
      setDailyTransactions(response.data.total_stock || 0);
    } catch (error) {
      toast.error(`Error fetching daily transactions: ${error.message}`);
    }
    
  };

  const fetchMonthlyTransactions = async () => {
    const { start, end } = dateRange;
    try {
      const response = await axios.post("http://localhost:3000/api/monthly-transactions", { start, end });
      setMonthlyTransactions(response.data);
    } catch (error) {
      // console.error("Error fetching monthly transactions:", error);
    }
  };

  const fetchMilkData = async () => {
    try {
      const sellingResponse = await axios.get("http://localhost:3000/api/milk-selling");
      const purchasingResponse = await axios.get("http://localhost:3000/api/milk-purchase");
      setMilkSellingData(sellingResponse.data);
      setMilkPurchasingData(purchasingResponse.data);
    } catch (error) {
      //console.error("Error fetching milk data:", error);
    }
  };

  const fetchSupplierReport = async (supplierCode) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/supplier-report/${supplierCode}`);
      setSupplierReport(response.data);
    } catch (error) {
      //console.error("Error fetching supplier report:", error);
    }
  };

  const fetchDailyMilkSales = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/daily-milk-sales");
      setDailyMilkSales(response.data.totalSales);
    } catch (error) {
      // console.error("Error fetching daily milk sales:", error);
    }
  };

  const handleDateRangeChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleFetchTransactions = () => {
    fetchMonthlyTransactions();
  };

  const handleSupplierReport = (e) => {
    e.preventDefault();
    const supplierCode = e.target.supplierCode.value;
    fetchSupplierReport(supplierCode);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Admin Dashboard</h1>

      {/* Daily Transactions Overview */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Daily Transactions Overview</h2>
        <p className="text-gray-600">
          <strong>Milk Selling:0 transactions</strong> 
        </p>
        <p className="text-gray-600">
          <strong>Milk Purchasing:</strong> {dailyTransactions||0} transactions
        </p>
      </div>

      {/* Filter Monthly Transactions */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Filter Monthly Transactions</h2>
        <div className="flex gap-4">
          <input
            type="date"
            name="start"
            value={dateRange.start}
            onChange={handleDateRangeChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <input
            type="date"
            name="end"
            value={dateRange.end}
            onChange={handleDateRangeChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <button
            onClick={handleFetchTransactions}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Monthly Transactions Data */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Monthly Transactions</h2>
        {monthlyTransactions.length > 0 ? (
          monthlyTransactions.map((transaction) => (
            <div key={transaction.id} className="border-b border-gray-200 py-2">
              <p className="text-gray-600">Milk Type: {transaction.milkType}</p>
              <p className="text-gray-600">Quantity: {transaction.quantity}</p>
              <p className="text-gray-600">Total: {transaction.total}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No transactions found for the selected range.</p>
        )}
      </div>

      {/* Milk Selling Data */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Milk Selling Data</h2>
        {milkSellingData.map((milk) => (
          <div key={milk.id} className="border-b border-gray-200 py-2">
            <p className="text-gray-600">Milk Type: {milk.milkType}</p>
            <p className="text-gray-600">Price Rate: {milk.priceRate}</p>
          </div>
        ))}
      </div>

      {/* Milk Purchasing Data */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Milk Purchasing Data</h2>
        {milkPurchasingData.map((milk) => (
          <div key={milk.id} className="border-b border-gray-200 py-2">
            <p className="text-gray-600">Milk Type: {milk.milkType}</p>
            <p className="text-gray-600">Fat Content: {milk.fatContent}</p>
          </div>
        ))}
      </div>

      {/* Generate Supplier Report */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Supplier Report</h2>
        <form onSubmit={handleSupplierReport} className="flex gap-4 items-center">
          <input
            type="text"
            name="supplierCode"
            placeholder="Enter Supplier Code"
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
          <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
            Generate
          </button>
        </form>
        {supplierReport && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700">Report for Supplier Code: {supplierReport.supplierCode}</h3>
            <p className="text-gray-600">Total Milk Supplied: {supplierReport.totalMilk}</p>
            <p className="text-gray-600">Remaining Amount: {supplierReport.remainingAmount}</p>
          </div>
        )}
      </div>

      {/* Daily Milk Sales */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Daily Milk Sales</h2>
        <p className="text-gray-600 imb-2">Total Milk Sold Today: {dailyMilkSales} liters</p>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Daily Milk Purchase</h2>
        <p className="text-gray-600">Total Milk purschase Today: {dailyTransactions} liters</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
