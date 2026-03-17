"use client";
import { useEffect, useState } from "react";

type Report = {
  id: string;
  timestamp: string;
  locationName: string;
  videoUrl: string;
  roadQuality: number;
  materialQuality: number;
  contractor: string;
  projectId: string;
};

export default function ContractorPage() {
  const [reports, setReports] = useState<Report[]>([]);

  // 🔐 Protect route
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");

    if (!user || user.role !== "contractor") {
      window.location.href = "/login";
    }

    const data = JSON.parse(localStorage.getItem("reports") || "[]");
    setReports(data);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-purple-900">
          🏗️ Contractor Dashboard
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("currentUser");
            window.location.href = "/login";
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-6">
        <div className="bg-white p-4 rounded-xl shadow">📍 Projects: 5</div>
        <div className="bg-white p-4 rounded-xl shadow">🚧 Ongoing: 3</div>
        <div className="bg-white p-4 rounded-xl shadow">👷 Staff: 42</div>
        <div className="bg-white p-4 rounded-xl shadow">📅 Duration: 12 mo</div>
      </div>

      {/* Reports */}
      <div className="max-w-6xl mx-auto grid gap-4">

        {reports.length === 0 ? (
          <div className="text-center text-gray-500">
            No reports available
          </div>
        ) : (
          reports.map((r) => (
            <div key={r.id} className="bg-white p-4 rounded-xl shadow">

              <div className="flex justify-between mb-2">
                <h2 className="font-bold text-lg">{r.locationName}</h2>
                <span className="text-sm text-gray-500">{r.timestamp}</span>
              </div>

              <p><b>Project:</b> {r.projectId}</p>
              <p><b>Contractor:</b> {r.contractor}</p>

              <div className="flex gap-4 mt-2">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Road: {r.roadQuality}
                </span>

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  Material: {r.materialQuality}
                </span>
              </div>

              <video
                src={r.videoUrl}
                controls
                className="w-full mt-3 rounded-lg"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}