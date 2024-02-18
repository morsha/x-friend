'use client';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Footer = () => {
  const router = useRouter();

  return (
    <Box component="footer" sx={{
        width: '100%',
        position: 'sticky',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        padding: '20px',
        backgroundColor: '#f5f5f5',
        boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
        borderTop: '1px solid #e0e0e0'
      }}>
      <Button variant="text" onClick={() => router.push('/services')} sx={{ textTransform: 'none', fontWeight: 'bold' }}>Services</Button>
      <Button variant="text" onClick={() => router.push('/mynfts')} sx={{ textTransform: 'none', fontWeight: 'bold' }}>My NFTs</Button>
      <Button variant="text" onClick={() => router.push('/myServices')} sx={{ textTransform: 'none', fontWeight: 'bold' }}>My Services</Button>
      <Button variant="text" onClick={() => router.push('/settings')} sx={{ textTransform: 'none', fontWeight: 'bold' }}>Settings</Button>
    </Box>
  );
}

export default Footer;
