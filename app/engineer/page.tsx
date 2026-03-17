"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EngineerPage() {
  const router = useRouter();

  const [locationName, setLocationName] = useState("");
  const [video, setVideo] = useState<string | null>(null);
  const [roadQuality, setRoadQuality] = useState<number | null>(null);
  const [materialQuality, setMaterialQuality] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!user || user.role !== "engineer") {
      router.push("/login");
    }
  }, []);

  // 📍 LOCATION
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

  // 🤖 QUALITY
  const calculateQuality = () => {
    setRoadQuality(Math.floor(60 + Math.random() * 40));
    setMaterialQuality(Math.floor(50 + Math.random() * 50));
  };

  // 🎥 VIDEO UPLOAD (FIXED)
  const handleVideoUpload = (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    // 🚨 Prevent large files crash
    if (file.size > 5 * 1024 * 1024) {
      alert("Video must be under 5MB");
      return;
    }

    const url = URL.createObjectURL(file); // ✅ better than base64
    setVideo(url);
    calculateQuality();
  };

  const submitReport = () => {
    if (!locationName || !video) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

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

    // ✅ Reset state
    setLocationName("");
    setVideo(null);
    setRoadQuality(null);
    setMaterialQuality(null);
    setLoading(false);

    alert("✅ Report Submitted!");

    // ✅ Redirect (important UX)
    router.push("/contractor");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="flex justify-between max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-gray-900">🚧 Engineer Panel</h1>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => {
            localStorage.removeItem("currentUser");
            router.push("/login");
          }}
        >
          Logout
        </button>
      </div>

      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow border space-y-4">

        {/* Location */}
        <button
          onClick={fetchLocation}
          className="bg-blue-600 text-white px-3 py-2 rounded w-full"
        >
          📍 Get Location
        </button>

        <input
          value={locationName}
          readOnly
          placeholder="Location will appear here"
          className="w-full border p-2 rounded text-gray-700"
        />

        {/* FILE INPUT FIXED */}
        <label className="block">
          <span className="text-gray-700 font-medium">Upload Road Video</span>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="mt-2 block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </label>

        {/* Video Preview */}
        {video && (
          <video src={video} controls className="w-full rounded border" />
        )}

        {/* Scores */}
        {roadQuality !== null && (
          <div className="text-gray-800 font-semibold">
            🚧 Road Quality: {roadQuality}
          </div>
        )}

        {materialQuality !== null && (
          <div className="text-gray-800 font-semibold">
            🧱 Material Quality: {materialQuality}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={submitReport}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>

      </div>
    </div>
  );
}