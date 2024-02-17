'use client'
import Link from 'next/link';
import SignUpForm from '../../../components/SignUpForm'; // 調整路徑以匹配你的檔案結構

export default function SignUpPage() {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm />
      <p>
        Already have an account?
        <Link href="/signin">
          Sign in here
        </Link>
      </p>
    </div>
  );
}