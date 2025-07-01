import React, { useEffect } from "react";

function ProcessPayment({ totalAmount, onSuccess }) {
  useEffect(() => {
    console.log("Total amount for payment:", totalAmount);
  }, [totalAmount]);

  const handlePay = () => {
    alert(`Payment of $${totalAmount.toFixed(2)} processed!`);
    // payment processing logic goes here
    
    if (onSuccess) onSuccess();
  };

  return (
    <div>
      <button
        onClick={handlePay}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Pay
      </button>
    </div>
  );
}

export default ProcessPayment;
