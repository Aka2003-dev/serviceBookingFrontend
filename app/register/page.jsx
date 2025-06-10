'use client';
import { useState } from 'react';
import API from '@/lib/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    contactNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/auth/register', form);
      toast.success('Registration Successful');
      router.push('/login');
    } catch (error) {
      toast.error(error.response?.data || 'Registration Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[95vh] bg-gradient-to-r from-blue-100 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-5 bg-white rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700">Register on ServiceApp</h2>

        {['username', 'email', 'password', 'address', 'contactNumber'].map((field) => (
          <input
            key={field}
            name={field}
            type={field === 'password' ? 'password' : 'text'}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white font-medium py-2 rounded-md hover:bg-purple-700 transition"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
