import React, { useState } from "react";

const MilkPurchase = () => {
  const [code, setCode] = useState("");
  const [milkType, setMilkType] = useState("buffalo");
  const [quantity, setQuantity] = useState("");
  const [fat, setFat] = useState("");
  const [sampleNo, setSampleNo] = useState("");

  const handleSave = () => {
    alert("Milk Purchase Saved!");
    // Save data to backend
  };

  return (
    <div className="purchase-container">
      <h2>Milk Purchasing</h2>
      <input
        type="text"
        placeholder="Code No."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <select value={milkType} onChange={(e) => setMilkType(e.target.value)}>
        <option value="buffalo">Buffalo</option>
        <option value="cow">Cow</option>
      </select>
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="number"
        placeholder="Fat"
        value={fat}
        onChange={(e) => setFat(e.target.value)}
      />
      <input
        type="text"
        placeholder="Sample No."
        value={sampleNo}
        onChange={(e) => setSampleNo(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default MilkPurchase;
