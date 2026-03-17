"use client";
import { useEffect, useState } from "react";

export default function InspectorPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    setReports(JSON.parse(localStorage.getItem("reports") || "[]"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        🏛️ Inspector Dashboard
      </h1>

      <table className="w-full bg-white shadow border rounded">

        <thead className="bg-gray-200 text-gray-800">
          <tr>
            <th className="p-2">Location</th>
            <th className="p-2">Road</th>
            <th className="p-2">Material</th>
            <th className="p-2">Video</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((r) => (
            <tr key={r.id} className="border-t">

              <td className="p-2 text-gray-700">{r.locationName}</td>

              <td className="p-2">{r.roadQuality}</td>
              <td className="p-2">{r.materialQuality}</td>

              <td className="p-2">
                <video src={r.videoUrl} controls className="w-32 h-20 rounded border" />
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}