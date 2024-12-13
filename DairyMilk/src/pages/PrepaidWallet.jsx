import React, { useState } from 'react';
import axios from 'axios';

const PrepaidWallet = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');

  const handleAddMoney = async () => {
    const data = { amount };

    try {
      const response = await axios.post('http://localhost:5000/api/add-money', data);
      setBalance(response.data.newBalance);
      console.log('Money added:', response.data);
    } catch (error) {
      console.error('Failed to add money', error);
    }
  };

  return (
    <div>
      <h2>Prepaid Wallet</h2>
      <p>Current Balance: {balance}</p>
      <label>
        Add Money:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <button onClick={handleAddMoney}>Add Money</button>
    </div>
  );
};

export default PrepaidWallet;
