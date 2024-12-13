import React, { useState } from 'react';
// import axiosInstance from '../api/axiosInstance';

const MilkPurchase = () => {
  const [codeNo, setCodeNo] = useState('');
  const [milkType, setMilkType] = useState('Buffalo');
  const [quantity, setQuantity] = useState('');
  const [fat, setFat] = useState('');
  const [sampleNo, setSampleNo] = useState('');

  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/milk-purchase', {
        codeNo,
        milkType,
        quantity,
        fat,
        sampleNo,
      });
      if (response.data.success) {
        alert('Milk purchased successfully');
      } else {
        alert('Purchase failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error during milk purchase');
    }
  };

  return (
    <form onSubmit={handlePurchase}>
      <h2>Milk Purchase</h2>
      <input
        type="text"
        placeholder="Code Number"
        value={codeNo}
        onChange={(e) => setCodeNo(e.target.value)}
        required
      />
      <select value={milkType} onChange={(e) => setMilkType(e.target.value)}>
        <option value="Buffalo">Buffalo</option>
        <option value="Cow">Cow</option>
      </select>
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Fat"
        value={fat}
        onChange={(e) => setFat(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Sample Number"
        value={sampleNo}
        onChange={(e) => setSampleNo(e.target.value)}
        required
      />
      <button type="submit">Purchase</button>
    </form>
  );
};

export default MilkPurchase;
