'use client';
import { clearAuthCookie } from '@/lib/Auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    clearAuthCookie();
    toast.success('Logged out');
    window.location.href = '/'; 
    //router.push('/');
  }, []);

  return null;
}
