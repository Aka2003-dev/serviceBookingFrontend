'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAuthCookie } from '@/lib/Auth';
import { usePathname } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  const pathname = usePathname();
  const [auth, setAuth] = useState({ username: null });

  useEffect(() => {
    const { username } = getAuthCookie();
    setAuth({ username });
  }, []);

  const navLinkClass = (path) =>
    `relative px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ${
      pathname === path ? 'bg-blue-800 text-white' : 'hover:bg-blue-700 text-white'
    }`;

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-3xl font-bold text-white tracking-wider">
          Service<span className="text-yellow-300">App</span>
        </div>
        <div className="flex gap-6 items-center">
          <Link href="/" className={navLinkClass('/')}>
            Home
          </Link>

          {auth.username && (
            <>
              <Link href="/service" className={navLinkClass('/service')}>
                Services
              </Link>
              <Link href="/bill-history" className={navLinkClass('/bill-history')}>
                Bill History
              </Link>
            </>
          )}

          {!auth.username ? (
            <>
              <Link href="/login" className={navLinkClass('/login')}>
                Login
              </Link>
              <Link href="/register" className={navLinkClass('/register')}>
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-white">
                <FaUserCircle className="text-2xl" />
                <span className="text-md">{auth.username}</span>
              </div>
              <Link href="/logout" className={navLinkClass('/logout')}>
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
