import { useState } from 'react';

const withdrawApiCall = async ({ address }: { address: string }) => {
  console.log(`Withdrawing to address ${address}`);
  // 模擬 API 延遲
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

function WithdrawModal({ onClose }: {
  onClose: () => void,
}) {
  const [address, setAddress] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // 調用提款 API
      await withdrawApiCall({ address });
      // 顯示成功模態窗口
      onClose(); // 關閉 WithdrawModal
    } catch (error) {
      console.error('Withdraw failed:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="address">Address:</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default WithdrawModal;