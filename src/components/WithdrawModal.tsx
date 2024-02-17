import { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useSnackbar } from '@/contexts/SnackbarContext';

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

const withdrawApiCall = async ({ address }: { address: string }) => {
  console.log(`Withdrawing to address ${address}`);
  // 模擬 API 延遲
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

function WithdrawModal({ onClose }: { onClose: () => void }) {
  const [address, setAddress] = useState('');

  const { openSnackbar } = useSnackbar();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // 調用提款 API
      await withdrawApiCall({ address });
      // 顯示成功模態窗口
      openSnackbar();
      onClose();
    } catch (error) {
      console.error('Withdraw failed:', error);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="withdraw-modal-title"
      aria-describedby="withdraw-modal-description"
    >
      <form onSubmit={handleSubmit}>
        <Box sx={style}>
          <Typography id="exchange-modal-title" variant="h6" component="h2">
            Withdraw to
          </Typography>
          <TextField
            id="address"
            label="Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Box>
      </form>
    </Modal>
  );
}

export default WithdrawModal;
