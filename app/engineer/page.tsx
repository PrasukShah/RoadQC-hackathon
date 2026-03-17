"use client";
import React, { useState, useEffect } from "react";

export default function EngineerPage() {
  const [locationName, setLocationName] = useState("");
  const [video, setVideo] = useState<string | null>(null);
  const [roadQuality, setRoadQuality] = useState<number | null>(null);
  const [materialQuality, setMaterialQuality] = useState<number | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!user || user.role !== "engineer") {
      window.location.href = "/login";
    }
  }, []);

  // 📍 AUTO LOCATION
  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await res.json();
      setLocationName(data.display_name);
    });
  };

  // 🤖 AUTO QUALITY SCORE (SIMULATED AI)
  const calculateQuality = () => {
    const road = Math.floor(60 + Math.random() * 40);
    const material = Math.floor(50 + Math.random() * 50);

    setRoadQuality(road);
    setMaterialQuality(material);
  };

  // 🎥 VIDEO UPLOAD
  const handleVideoUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideo(reader.result as string);
        calculateQuality(); // auto scoring
      };
      reader.readAsDataURL(file);
    }
  };

  const submitReport = () => {
    if (!locationName || !video) {
      alert("Fill all fields");
      return;
    }

    const report = {
      id: Date.now(),
      locationName,
      videoUrl: video,
      roadQuality,
      materialQuality,
      timestamp: new Date().toLocaleString(),
      contractor: "ABC Infra Ltd",
      projectId: "NH-48",
    };

    const old = JSON.parse(localStorage.getItem("reports") || "[]");
    localStorage.setItem("reports", JSON.stringify([report, ...old]));

    alert("Report Submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="flex justify-between max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-gray-900">🚧 Engineer Panel</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => {
            localStorage.removeItem("currentUser");
            window.location.href = "/login";
          }}>
          Logout
        </button>
      </div>

      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow border space-y-4">

        <button onClick={fetchLocation} className="bg-blue-600 text-white px-3 py-2 rounded">
          📍 Get Location
        </button>

        <input
          value={locationName}
          readOnly
          className="w-full border p-2 rounded text-gray-700"
        />

        <input type="file" accept="video/*" onChange={handleVideoUpload} />

        {video && <video src={video} controls className="w-full rounded border" />}

        {roadQuality && (
          <div className="text-gray-800 font-semibold">
            Road Quality: {roadQuality}
          </div>
        )}

        {materialQuality && (
          <div className="text-gray-800 font-semibold">
            Material Quality: {materialQuality}
          </div>
        )}

        <button onClick={submitReport}
          className="w-full bg-green-600 text-white py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
}