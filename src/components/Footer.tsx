'use client'
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();

  return (
    <footer>
      <button onClick={() => router.push('/services')}>Services</button>
      <button onClick={() => router.push('/mynfts')}>My NFTs</button>
      <button onClick={() => router.push('/settings')}>Settings</button>
    </footer>
  );
}

export default Footer;