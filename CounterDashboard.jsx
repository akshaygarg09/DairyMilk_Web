import React, { useState } from 'react';
import axios from 'axios';

const CounterDashboard = () => {
  // State variables for Milk Selling
  const [milkTypeSelling, setMilkTypeSelling] = useState('cow');
  const [quantitySelling, setQuantitySelling] = useState('');
  const [priceRateSelling, setPriceRateSelling] = useState(30); // Default price rate for selling
  
  // State variables for Milk Purchasing
  const [milkTypePurchasing, setMilkTypePurchasing] = useState('cow');
  const [quantityPurchasing, setQuantityPurchasing] = useState('');
  const [fatContentPurchasing, setFatContentPurchasing] = useState('');
  
  // Receipt states for both features
  const [receiptSelling, setReceiptSelling] = useState(null);
  const [receiptPurchasing, setReceiptPurchasing] = useState(null);

  // Handle Milk Selling
  const handleMilkSelling = async () => {
    const data = {
      milkType: milkTypeSelling,
      quantity: quantitySelling,
      priceRate: priceRateSelling,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/milk-selling', data);
      setReceiptSelling(response.data);
      console.log('Milk Selling Receipt:', response.data);
    } catch (error) {
      console.error('Failed to sell milk', error);
    }
  };

  // Handle Milk Purchasing
  const handleMilkPurchasing = async () => {
    const data = {
      milkType: milkTypePurchasing,
      quantity: quantityPurchasing,
      fatContent: fatContentPurchasing,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/milk-purchase', data);
      setReceiptPurchasing(response.data);
      console.log('Milk Purchasing Receipt:', response.data);
    } catch (error) {
      console.error('Failed to purchase milk', error);
    }
  };

  return (
    <div>
      <h2>Counter Dashboard</h2>

      {/* Milk Selling Section */}
      <div>
        <h3>Milk Selling</h3>
        <form>
          <label>
            Milk Type:
            <select
              value={milkTypeSelling}
              onChange={(e) => setMilkTypeSelling(e.target.value)}
            >
              <option value="cow">Cow</option>
              <option value="buffalo">Buffalo</option>
            </select>
          </label>
          <br />
          <label>
            Quantity:
            <input
              type="number"
              value={quantitySelling}
              onChange={(e) => setQuantitySelling(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Price Rate:
            <input
              type="number"
              value={priceRateSelling}
              onChange={(e) => setPriceRateSelling(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="button" onClick={handleMilkSelling}>
            Sell Milk
          </button>
        </form>

        {/* Receipt for Milk Selling */}
        {receiptSelling && (
          <div>
            <h4>Milk Selling Receipt</h4>
            <p>Milk Type: {receiptSelling.milkType}</p>
            <p>Quantity: {receiptSelling.quantity}</p>
            <p>Price Rate: {receiptSelling.priceRate}</p>
            <p>Total: {receiptSelling.total}</p>
          </div>
        )}
      </div>

      <hr />

      {/* Milk Purchasing Section */}
      <div>
        <h3>Milk Purchasing</h3>
        <form>
          <label>
            Milk Type:
            <select
              value={milkTypePurchasing}
              onChange={(e) => setMilkTypePurchasing(e.target.value)}
            >
              <option value="cow">Cow</option>
              <option value="buffalo">Buffalo</option>
            </select>
          </label>
          <br />
          <label>
            Quantity:
            <input
              type="number"
              value={quantityPurchasing}
              onChange={(e) => setQuantityPurchasing(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Fat Content:
            <input
              type="text"
              value={fatContentPurchasing}
              onChange={(e) => setFatContentPurchasing(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="button" onClick={handleMilkPurchasing}>
            Purchase Milk
          </button>
        </form>

        {/* Receipt for Milk Purchasing */}
        {receiptPurchasing && (
          <div>
            <h4>Milk Purchasing Receipt</h4>
            <p>Milk Type: {receiptPurchasing.milkType}</p>
            <p>Quantity: {receiptPurchasing.quantity}</p>
            <p>Fat Content: {receiptPurchasing.fatContent}</p>
            <p>Total Cost: {receiptPurchasing.totalCost}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounterDashboard;
