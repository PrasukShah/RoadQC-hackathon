"use client";
import React, { useEffect, useState } from "react";

type Report = {
  id: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  photoUrl: string;
  aiScore: number;
  isSpoofed: boolean;
};

export default function AdminPage() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");

    if (!user || user.role !== "admin") {
      window.location.href = "/login";
    }

    const storedReports = JSON.parse(localStorage.getItem("reports") || "[]");
    setReports(storedReports);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-purple-900">
          🏛️ Government Dashboard
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("currentUser");
            window.location.href = "/login";
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Logout
        </button>
      </div>

      {/* Table Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 overflow-x-auto">
        <table className="w-full text-left">

          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3">Time</th>
              <th className="p-3">Photo</th>
              <th className="p-3">Location</th>
              <th className="p-3">AI Score</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-500">
                  No reports submitted yet
                </td>
              </tr>
            ) : (
              reports.map((r) => (
                <tr key={r.id} className="border-b hover:bg-gray-50 transition">
                  
                  <td className="p-3 text-sm text-gray-600">{r.timestamp}</td>

                  <td className="p-3">
                    <img
                      src={r.photoUrl}
                      className="w-16 h-16 rounded-lg object-cover shadow"
                    />
                  </td>

                  <td className="p-3 text-xs font-mono">
                    {r.latitude.toFixed(4)}, {r.longitude.toFixed(4)}
                  </td>

                  <td className="p-3 font-bold">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        r.aiScore > 75 ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {r.aiScore}
                    </span>
                  </td>

                  <td className="p-3">
                    {r.isSpoofed ? (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                        🚨 Fraud Detected
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                        ✅ Verified
                      </span>
                    )}
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}