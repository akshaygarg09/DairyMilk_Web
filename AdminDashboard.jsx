import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  // State variables for transactions and receipts
  const [dailyTransactions, setDailyTransactions] = useState({ selling: [], purchasing: [] });
  const [monthlyTransactions, setMonthlyTransactions] = useState([]);
  const [milkSellingData, setMilkSellingData] = useState([]);
  const [milkPurchasingData, setMilkPurchasingData] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [supplierReport, setSupplierReport] = useState(null);
  const [dailyMilkSales, setDailyMilkSales] = useState(0);

  // Fetch daily transactions on component mount
  useEffect(() => {
    fetchDailyTransactions();
    fetchMilkData();
    fetchDailyMilkSales();
  }, []);

  // Function to fetch daily transactions
  const fetchDailyTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/daily-transactions');
      setDailyTransactions(response.data);
    } catch (error) {
      console.error('Error fetching daily transactions:', error);
    }
  };

  // Function to fetch monthly transactions based on date range
  const fetchMonthlyTransactions = async () => {
    const { start, end } = dateRange;
    try {
      const response = await axios.post('http://localhost:5000/api/monthly-transactions', { start, end });
      setMonthlyTransactions(response.data);
    } catch (error) {
      console.error('Error fetching monthly transactions:', error);
    }
  };

  // Fetch milk purchase and selling data for admin
  const fetchMilkData = async () => {
    try {
      const sellingResponse = await axios.get('http://localhost:5000/api/milk-selling');
      const purchasingResponse = await axios.get('http://localhost:5000/api/milk-purchase');
      setMilkSellingData(sellingResponse.data);
      setMilkPurchasingData(purchasingResponse.data);
    } catch (error) {
      console.error('Error fetching milk data:', error);
    }
  };

  // Fetch supplier report by code
  const fetchSupplierReport = async (supplierCode) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/supplier-report/${supplierCode}`);
      setSupplierReport(response.data);
    } catch (error) {
      console.error('Error fetching supplier report:', error);
    }
  };

  // Fetch daily milk sales
  const fetchDailyMilkSales = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/daily-milk-sales');
      setDailyMilkSales(response.data.totalSales);
    } catch (error) {
      console.error('Error fetching daily milk sales:', error);
    }
  };

  // Handle date range change
  const handleDateRangeChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  // Handle fetching transactions by date range
  const handleFetchTransactions = () => {
    fetchMonthlyTransactions();
  };

  // Handle supplier report generation
  const handleSupplierReport = (e) => {
    e.preventDefault();
    const supplierCode = e.target.supplierCode.value;
    fetchSupplierReport(supplierCode);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Milk Purchase and Milk Selling Transaction Overview */}
      <div>
        <h3>Daily Transactions Overview</h3>
        <p><strong>Milk Selling:</strong> {dailyTransactions.selling.length} transactions</p>
        <p><strong>Milk Purchasing:</strong> {dailyTransactions.purchasing.length} transactions</p>
      </div>

      {/* Filter Monthly Transactions */}
      <div>
        <h3>Filter Monthly Transactions</h3>
        <input
          type="date"
          name="start"
          value={dateRange.start}
          onChange={handleDateRangeChange}
        />
        <input
          type="date"
          name="end"
          value={dateRange.end}
          onChange={handleDateRangeChange}
        />
        <button onClick={handleFetchTransactions}>Filter Transactions</button>
      </div>

      {/* Monthly Transactions Data */}
      <div>
        <h3>Monthly Transactions</h3>
        {monthlyTransactions.length > 0 ? (
          monthlyTransactions.map((transaction) => (
            <div key={transaction.id}>
              <p>Milk Type: {transaction.milkType}</p>
              <p>Quantity: {transaction.quantity}</p>
              <p>Total: {transaction.total}</p>
            </div>
          ))
        ) : (
          <p>No transactions found for the selected range.</p>
        )}
      </div>

      {/* Milk Selling Data */}
      <div>
        <h3>Milk Selling Data</h3>
        {milkSellingData.map((milk) => (
          <div key={milk.id}>
            <p>Milk Type: {milk.milkType}</p>
            <p>Price Rate: {milk.priceRate}</p>
          </div>
        ))}
      </div>

      {/* Milk Purchasing Data */}
      <div>
        <h3>Milk Purchasing Data</h3>
        {milkPurchasingData.map((milk) => (
          <div key={milk.id}>
            <p>Milk Type: {milk.milkType}</p>
            <p>Fat Content: {milk.fatContent}</p>
          </div>
        ))}
      </div>

      {/* Generate Supplier Report */}
      <div>
        <h3>Supplier Report</h3>
        <form onSubmit={handleSupplierReport}>
          <label>
            Supplier Code:
            <input type="text" name="supplierCode" required />
          </label>
          <button type="submit">Generate Report</button>
        </form>
        {supplierReport && (
          <div>
            <h4>Report for Supplier Code: {supplierReport.supplierCode}</h4>
            <p>Total Milk Supplied: {supplierReport.totalMilk}</p>
            <p>Remaining Amount: {supplierReport.remainingAmount}</p>
          </div>
        )}
      </div>

      {/* Daily Milk Sales */}
      <div>
        <h3>Daily Milk Sales</h3>
        <p>Total Milk Sold Today: {dailyMilkSales} liters</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
