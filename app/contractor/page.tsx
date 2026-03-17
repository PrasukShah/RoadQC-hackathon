"use client";
import { useEffect, useState } from "react";

export default function ContractorPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("reports") || "[]");
    setReports(data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-6xl mx-auto flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">🏗️ Contractor Dashboard</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Logout</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 max-w-6xl mx-auto mb-6">
        <div className="bg-white p-4 rounded-xl shadow border text-gray-800">Projects: 5</div>
        <div className="bg-white p-4 rounded-xl shadow border text-gray-800">Ongoing: 3</div>
        <div className="bg-white p-4 rounded-xl shadow border text-gray-800">Staff: 42</div>
        <div className="bg-white p-4 rounded-xl shadow border text-gray-800">Duration: 12 mo</div>
      </div>

      {/* Reports */}
      <div className="max-w-6xl mx-auto space-y-4">

        {reports.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded-xl shadow border">

            <div className="flex justify-between">
              <h2 className="text-lg font-bold text-gray-900">{r.locationName}</h2>
              <span className="text-sm text-gray-500">{r.timestamp}</span>
            </div>

            <p className="text-gray-700">Project: {r.projectId}</p>
            <p className="text-gray-700">Contractor: {r.contractor}</p>

            <div className="flex gap-4 mt-2">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                Road: {r.roadQuality}
              </span>

              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                Material: {r.materialQuality}
              </span>
            </div>

            <video src={r.videoUrl} controls className="w-full mt-3 rounded border" />
          </div>
        ))}
      </div>
    </div>
  );
}