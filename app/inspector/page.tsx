"use client";
import { useEffect, useState } from "react";

export default function InspectorPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("reports") || "[]");
    setReports(data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        🏛️ Government Inspector Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow border text-gray-800">Total Roads: 12</div>
        <div className="bg-white p-4 rounded-xl shadow border text-gray-800">Budget: ₹25 Cr</div>
        <div className="bg-white p-4 rounded-xl shadow border text-gray-800">Completed: 6</div>
        <div className="bg-white p-4 rounded-xl shadow border text-gray-800">Delayed: 2</div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border overflow-x-auto">

        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="p-3">Location</th>
              <th className="p-3">Contractor</th>
              <th className="p-3">Road Quality</th>
              <th className="p-3">Material Quality</th>
              <th className="p-3">Video</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className="border-t">

                <td className="p-3 text-gray-700">{r.locationName}</td>
                <td className="p-3 text-gray-700">{r.contractor}</td>

                <td className="p-3">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                    {r.roadQuality}
                  </span>
                </td>

                <td className="p-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {r.materialQuality}
                  </span>
                </td>

                <td className="p-3">
                  <video
                    src={r.videoUrl}
                    controls
                    className="w-32 h-20 object-cover rounded border"
                  />
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}