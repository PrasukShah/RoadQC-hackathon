"use client";
import React, { useState, useEffect } from "react";

export default function EngineerPage() {
  const [locationName, setLocationName] = useState("");
  const [video, setVideo] = useState<string | null>(null);
  const [roadQuality, setRoadQuality] = useState(0);
  const [materialQuality, setMaterialQuality] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!user || user.role !== "engineer") {
      window.location.href = "/login";
    }
  }, []);

  const handleVideoUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setVideo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const submitReport = () => {
    const report = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      locationName,
      videoUrl: video,
      roadQuality,
      materialQuality,
      contractor: "ABC Infra Ltd",
      projectId: "NH-48",
    };

    const old = JSON.parse(localStorage.getItem("reports") || "[]");
    localStorage.setItem("reports", JSON.stringify([report, ...old]));

    alert("Report Submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-4xl mx-auto flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">🚧 Engineer Panel</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Logout</button>
      </div>

      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow border border-gray-200 space-y-4">

        <input
          type="text"
          placeholder="Location"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded text-gray-700"
        />

        <input type="file" accept="video/*" onChange={handleVideoUpload} />

        {video && <video src={video} controls className="w-full rounded border" />}

        <input
          type="number"
          placeholder="Road Quality"
          onChange={(e) => setRoadQuality(Number(e.target.value))}
          className="w-full border p-2 rounded text-gray-700"
        />

        <input
          type="number"
          placeholder="Material Quality"
          onChange={(e) => setMaterialQuality(Number(e.target.value))}
          className="w-full border p-2 rounded text-gray-700"
        />

        <button
          onClick={submitReport}
          className="w-full bg-green-600 text-white py-2 rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
}