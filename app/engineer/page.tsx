"use client";
import React, { useState, useEffect } from "react";

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

export default function EngineerPage() {
  const [locationName, setLocationName] = useState("");
  const [video, setVideo] = useState<string | null>(null);
  const [roadQuality, setRoadQuality] = useState<number>(0);
  const [materialQuality, setMaterialQuality] = useState<number>(0);

  // 🔐 Protect route
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!user || user.role !== "engineer") {
      window.location.href = "/login";
    }
  }, []);

  // 🎥 Handle Video Upload
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 🚀 Submit Report
  const submitReport = () => {
    if (!locationName || !video) {
      alert("Please fill all fields!");
      return;
    }

    const newReport: Report = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      locationName,
      videoUrl: video,
      roadQuality,
      materialQuality,
      contractor: "ABC Infra Ltd",
      projectId: "NH-48-001",
    };

    const existing = JSON.parse(localStorage.getItem("reports") || "[]");
    localStorage.setItem("reports", JSON.stringify([newReport, ...existing]));

    alert("Report submitted successfully!");

    // reset
    setLocationName("");
    setVideo(null);
    setRoadQuality(0);
    setMaterialQuality(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-blue-900">
          🚧 Field Engineer Portal
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

      {/* Form Card */}
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-4">

        {/* Location */}
        <input
          type="text"
          placeholder="Enter Location (e.g., NH-48 Surat)"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* Video Upload */}
        <input
          type="file"
          accept="video/*"
          capture="environment"
          onChange={handleVideoUpload}
          className="w-full"
        />

        {video && (
          <video src={video} controls className="w-full rounded mt-2" />
        )}

        {/* Quality Inputs */}
        <input
          type="number"
          placeholder="Road Quality (0-100)"
          value={roadQuality}
          onChange={(e) => setRoadQuality(Number(e.target.value))}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Material Quality (0-100)"
          value={materialQuality}
          onChange={(e) => setMaterialQuality(Number(e.target.value))}
          className="w-full border p-2 rounded"
        />

        {/* Submit */}
        <button
          onClick={submitReport}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold"
        >
          🚀 Submit Inspection
        </button>
      </div>
    </div>
  );
}