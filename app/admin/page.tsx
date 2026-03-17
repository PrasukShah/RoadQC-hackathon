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

  // 🔐 Protect Route
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");

    if (!user || user.role !== "admin") {
      window.location.href = "/login";
    }

    const storedReports = JSON.parse(localStorage.getItem("reports") || "[]");
    setReports(storedReports);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("currentUser");
            window.location.href = "/login";
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Time</th>
              <th className="p-2">Photo</th>
              <th className="p-2">Location</th>
              <th className="p-2">Score</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No reports yet
                </td>
              </tr>
            ) : (
              reports.map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="p-2">{r.timestamp}</td>

                  <td className="p-2">
                    <img src={r.photoUrl} className="w-16 h-16 object-cover" />
                  </td>

                  <td className="p-2 text-sm">
                    {r.latitude.toFixed(4)}, {r.longitude.toFixed(4)}
                  </td>

                  <td className="p-2 font-bold">
                    {r.aiScore > 75 ? (
                      <span className="text-green-600">{r.aiScore}</span>
                    ) : (
                      <span className="text-red-500">{r.aiScore}</span>
                    )}
                  </td>

                  <td className="p-2">
                    {r.isSpoofed ? (
                      <span className="text-red-600">FRAUD</span>
                    ) : (
                      <span className="text-green-600">Verified</span>
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