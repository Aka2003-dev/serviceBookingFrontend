'use client';
import { useEffect, useState } from 'react';
import { getAuthCookie } from '@/lib/Auth';
import API from '@/lib/api';

export default function BillHistoryPage() {
  const { token, username } = getAuthCookie();
  const [bills, setBills] = useState([]);

  useEffect(() => {
    if (!username) return;
    API.get(`/bill/user/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setBills(res.data))
      .catch(() => setBills([]));
  }, [username]);

  if (!bills.length)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600 text-lg">
        No bill history found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Billing History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-100 text-blue-800 text-left">
                <th className="px-4 py-2">Service</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Vendor</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bills.map(bill => (
                <tr key={bill.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{bill.serviceType}</td>
                  <td className="px-4 py-3 text-gray-600">{bill.dateSlot}</td>
                  <td className="px-4 py-3 text-gray-700">{bill.vendorName}</td>
                  <td className="px-4 py-3 font-semibold text-green-600">
                    ₹{bill.amount}
                  </td>
                  <td
                    className={`px-4 py-3 font-medium ${
                      bill.status === 'PAID'
                        ? 'text-green-600'
                        : bill.status === 'PENDING'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {bill.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
