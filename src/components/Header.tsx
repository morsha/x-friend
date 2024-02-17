import { useEffect, useState } from "react";
import ExchangeModal from "./ExchangeModal";
import WithdrawModal from "./WithdrawModal";

export default function Header() {
  const [userAddress, setUserAddress] = useState('');
  const [userUSDTBalance, setUserUSDTBalance] = useState('');
  const [userXTokenBalance, setUserXTokenBalance] = useState('');

  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  useEffect(() => {
    // call api get user data
    setUserAddress("0x123...");
    setUserUSDTBalance('100');
    setUserXTokenBalance('200');
  }, []);

  return (
    <header>
      <p>Address: {userAddress}</p>
      <p>USDT Balance: {userUSDTBalance}</p>
      <p>XToken Balance: {userXTokenBalance}</p>
      <button onClick={() => setShowExchangeModal(true)}>Exchange</button>
      <button onClick={() => setShowWithdrawModal(true)}>Withdraw</button>
      {showExchangeModal && <ExchangeModal onClose={() => setShowExchangeModal(false)} />}
      {showWithdrawModal && <WithdrawModal onClose={() => setShowWithdrawModal(false)} />}
    </header>
  );
}