import React, { useState } from 'react';
import axios from 'axios';

const CollectionDashboard = () => {
  const [milkType, setMilkType] = useState('cow');
  const [quantity, setQuantity] = useState('');
  const [fatContent, setFatContent] = useState('');

  const handleMilkPurchase = async () => {
    const purchaseData = {
      milkType,
      quantity,
      fatContent,
    };

    try {
      const response = await axios.post('http://localhost3000/api/milk-purchase', purchaseData);
      console.log('Milk purchased:', response.data);
    } catch (error) {
      console.error('Milk purchase failed', error);
    }
  };

  return (
    <div>
      <h2>Collection Dashboard</h2>
      <form>
        <label>
          Milk Type:
          <select value={milkType} onChange={(e) => setMilkType(e.target.value)}>
            <option value="cow">Cow</option>
            <option value="buffalo">Buffalo</option>
          </select>
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        <label>
          Fat Content:
          <input
            type="text"
            value={fatContent}
            onChange={(e) => setFatContent(e.target.value)}
            required
          />
        </label>
        <button type="button" onClick={handleMilkPurchase}>
          Purchase Milk
        </button>
      </form>
    </div>
  );
};

export default CollectionDashboard;
