"use client";
import { useEffect, useState } from "react";

export default function ContractorPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!user || user.role !== "contractor") {
      window.location.href = "/login";
    }

    setReports(JSON.parse(localStorage.getItem("reports") || "[]"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        🏗️ Contractor Dashboard
      </h1>

      {reports.map((r) => (
        <div key={r.id} className="bg-white p-4 mb-4 rounded shadow border">

          <h2 className="text-lg font-bold text-gray-900">{r.locationName}</h2>
          <p className="text-gray-700">{r.timestamp}</p>

          <div className="flex gap-3 mt-2">
            <span className="bg-green-100 px-2 py-1 rounded">
              Road: {r.roadQuality}
            </span>
            <span className="bg-blue-100 px-2 py-1 rounded">
              Material: {r.materialQuality}
            </span>
          </div>

          <video src={r.videoUrl} controls className="w-full mt-2 rounded border" />
        </div>
      ))}
    </div>
  );
}