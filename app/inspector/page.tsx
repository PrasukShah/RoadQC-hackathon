"use client";
import { useEffect, useState } from "react";

export default function InspectorPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("reports") || "[]");
    setReports(data);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        🏛️ Government Inspector Portal
      </h1>

      {/* Project Overview */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">Total Roads: 12</div>
        <div className="bg-white p-4 rounded shadow">Budget: ₹25 Cr</div>
        <div className="bg-white p-4 rounded shadow">Completed: 6</div>
        <div className="bg-white p-4 rounded shadow">Delayed: 2</div>
      </div>

      {/* Reports */}
      <div className="bg-white p-6 rounded shadow">
        <table className="w-full">
          <thead>
            <tr>
              <th>Location</th>
              <th>Contractor</th>
              <th>Road Quality</th>
              <th>Material Quality</th>
              <th>Video</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className="border-b">
                <td>{r.locationName}</td>
                <td>{r.contractor}</td>
                <td>{r.roadQuality}</td>
                <td>{r.materialQuality}</td>
                <td>
                  <video src={r.videoUrl} controls className="w-32" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}