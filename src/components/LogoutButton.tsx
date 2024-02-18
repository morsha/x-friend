import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      router.push('/signin')
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}