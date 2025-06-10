'use client';
import { useState } from 'react';
import { getAuthCookie } from '@/lib/Auth';
import API from '@/lib/api';
import toast from 'react-hot-toast';

const serviceData = {
  ACRepair: [
    { name: 'John AC Guy', price: 1000 },
    { name: 'CoolCare Experts', price: 1200 }
  ],
  HouseCleaning: [
    { name: 'CleanUp Pro', price: 800 },
    { name: 'Sparkle Team', price: 700 }
  ],
  Electrician: [
    { name: 'PowerFix Electric', price: 500 },
    { name: 'BrightSpark', price: 600 }
  ]
};

export default function ServicePage() {
  const { token, username } = getAuthCookie();

  const [form, setForm] = useState({
    serviceType: 'ACRepair',
    vendorName: serviceData['ACRepair'][0].name,
    date: '',
    time: '',
    address: '',
    amount: serviceData['ACRepair'][0].price,
  });

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'serviceType') {
      const defaultVendor = serviceData[value][0];
      setForm(prev => ({
        ...prev,
        serviceType: value,
        vendorName: defaultVendor.name,
        amount: defaultVendor.price
      }));
    } else if (name === 'vendorName') {
      const vendor = serviceData[form.serviceType].find(v => v.name === value);
      setForm(prev => ({
        ...prev,
        vendorName: value,
        amount: vendor?.price || 0
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!token) return toast.error('Please login first');

    const dateSlot = `${form.date} ${form.time}`;

    const payload = {
      userName: username,
      serviceType: form.serviceType,
      dateSlot,
      address: form.address,
      vendorName: form.vendorName,
      amount: form.amount
    };

    try {
      await API.post('/user/book', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Service Booked');
    } catch (error) {
      toast.error('Booking Failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-lg rounded-xl p-8 space-y-5 border border-blue-200"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700">Book a Service</h2>

       
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Service Type</label>
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.keys(serviceData).map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

       
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Select Vendor</label>
          <select
            name="vendorName"
            value={form.vendorName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {serviceData[form.serviceType].map(v => (
              <option key={v.name} value={v.name}>
                {v.name} - ₹{v.price}
              </option>
            ))}
          </select>
        </div>

    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

  
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

     
        <div className="grid grid-cols-2 gap-2 font-medium text-sm text-gray-700 mt-4">
          <p>Selected Vendor:</p>
          <p className="text-right">{form.vendorName}</p>
          <p>Total Amount:</p>
          <p className="text-right text-green-700 font-semibold">₹{form.amount}</p>
        </div>

    
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded mt-4"
        >
          Book Service
        </button>
      </form>
    </div>
  );
}
