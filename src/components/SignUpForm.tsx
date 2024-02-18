'use client'
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      router.push('/services');
    }
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const response = await fetch('/api/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email, password }),
    // });
    // const data = await response.json();
    // if (response.ok) {
    //   console.log('Registration success:', data);
    //   // 處理註冊成功
    // } else {
    //   console.error('Registration failed:', data);
    //   // 處理錯誤情況
    // }

    const accessToken = '123123';
    localStorage.setItem('accessToken', accessToken);

    router.push('/services');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
