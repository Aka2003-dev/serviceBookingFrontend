"use client";

import { useEffect } from "react";

export default function Home() {

  // Check if all services are healthy
  // Coz render is not starting services automatically
  useEffect(() => {
    const services = [
      'https://user-service-yomu.onrender.com',
      'https://auth-service-efev.onrender.com',
      'https://bill-service-6fnu.onrender.com'
    ];

    services.forEach(url => {
      fetch(url)
        .then(res => {
          console.log(`Pinged ${url}: ${res.status}`);
        })
        .catch(() => {
          // Suppress known unreachable root path
          console.log(`Pinged ${url}: service is waking up`);
        });
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
      
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-6">
          Service Booking App Overview
        </h1>

      
        <p className="text-gray-700 text-lg text-center mb-8">
          This full-stack service booking platform is built using{" "}
          <span className="font-semibold text-blue-600">Next.js</span> for the
          frontend and{" "}
          <span className="font-semibold text-green-600">Spring Boot</span> for
          the backend. It allows users to login, register, book services, and
          view billing history — all under one platform.
        </p>

      
        <div className="flex justify-center mb-6">
          <img
            src="info.png"
            alt="Application Architecture"
            className="rounded-lg shadow-md max-w-full"
          />
        </div>

      
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Frontend (Next.js)
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Client-side routing with app directory and dynamic routing
              </li>
              <li>
                Form handling, validation, and API integration using Axios
              </li>
              <li>Auth management via cookies</li>
              <li>Styled using Tailwind CSS for responsiveness and polish</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Backend (Spring Boot)
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Microservices: AuthService, UserService, BillService</li>
              <li>API Gateway for routing requests to services</li>
              <li>JWT-based Authentication</li>
              <li>Postgres deployed on Neon DB</li>
            </ul>
          </div>
        </div>

        
        <div className="mt-10 text-center text-sm text-gray-500">
          Developed by PMA.
        </div>
      </div>
    </div>
  );
}
