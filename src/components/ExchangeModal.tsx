import { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const exchangeApiCall = async ({ amount, currency }: {
  amount: string,
  currency: string,
}) => {
  console.log(`Exchanging ${amount} of ${currency}`);
  // 模拟 API 延迟
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

function ExchangeModal({ onClose }: any) {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('XToken');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleExchange = async () => {
    try {
      await exchangeApiCall({ amount, currency });
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Exchange failed:', error);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose(); // 关闭兑换模态窗口
  };

  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="exchange-modal-title"
    >
      <Box sx={style}>
        <Typography id="exchange-modal-title" variant="h6" component="h2">
          Exchange
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Currency</InputLabel>
          <Select
            value={currency}
            label="Currency"
            onChange={(e) => {
              setCurrency(e.target.value);
              setAmount('');
            }}
          >
            <MenuItem value="XToken">XToken to USDT</MenuItem>
            <MenuItem value="USDT">USDT to XToken</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          fullWidth
        />
        <Button variant="contained" onClick={handleExchange} sx={{ mt: 2 }}>Exchange</Button>
        {showSuccessModal && (
          <Box sx={{ mt: 2 }}>
            <Typography>✅ Exchange Successful!</Typography>
            <Button variant="outlined" onClick={handleCloseSuccessModal} sx={{ mt: 1 }}>Close</Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

export default ExchangeModal;
