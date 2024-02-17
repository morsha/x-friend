import { useState } from 'react';

const exchangeApiCall = async ({ amount, currency }: {
  amount: string,
  currency: string,
}) => {
  console.log(`Exchanging ${amount} of ${currency}`);
  // 模擬 API 延遲
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

function ExchangeModal({ onClose }: any) {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('XToken');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleExchange = async () => {
    try {
      // 假設這是兌換 API 調用
      await exchangeApiCall({ amount, currency });
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Exchange failed:', error);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose(); // 關閉兌換模態窗口
    // 呼叫更新餘額的 API
  };

  return (
    <div>
      <select value={currency} onChange={(e) => {
        setCurrency(e.target.value);
        setAmount('');
      }}>
        <option value="XToken">XToken to USDT</option>
        <option value="USDT">USDT to XToken</option>
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={handleExchange}>Exchange</button>
      <button onClick={onClose}>Close</button>
      {showSuccessModal && (
        <div>
          <p>✅ Exchange Successful!</p>
          <button onClick={handleCloseSuccessModal}>Close</button>
        </div>
      )}
    </div>
  );
}

export default ExchangeModal;
