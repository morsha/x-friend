'use client'
import Link from 'next/link';
import SignInForm from '../../../components/SignInForm'; // 調整路徑以匹配你的檔案結構

export default function SignInPage() {
  return (
    <div>
      <h1>Sign In</h1>
      <SignInForm />
      <p>
        Don&apos;t have an account?
        <Link href="/signup">
          Sign up here
        </Link>
      </p>
    </div>
  );
}