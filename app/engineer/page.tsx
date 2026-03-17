"use client";
import React, { useState, useRef, useEffect } from "react";

type Report = {
  id: string;
  timestamp: string;
  latitude: number | null;
  longitude: number | null;
  photoUrl: string | null;
  aiScore: number;
  isSpoofed: boolean;
};

const TARGET_LAT = 28.6139;
const TARGET_LNG = 77.2090;

export default function EngineerPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!user || user.role !== "engineer") {
      window.location.href = "/login";
    }
  }, []);

  const captureLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("Location denied")
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const submitReport = () => {
    if (!location || !photo) {
      alert("Complete all steps!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const isSpoofed =
        Math.abs(location.lat - TARGET_LAT) > 0.1 ||
        Math.abs(location.lng - TARGET_LNG) > 0.1;

      const newReport: Report = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toLocaleString(),
        latitude: location.lat,
        longitude: location.lng,
        photoUrl: photo,
        aiScore: Math.floor(Math.random() * 50) + 50,
        isSpoofed,
      };

      const existing = JSON.parse(localStorage.getItem("reports") || "[]");
      localStorage.setItem("reports", JSON.stringify([newReport, ...existing]));

      setLocation(null);
      setPhoto(null);
      setLoading(false);

      alert("Report submitted successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-blue-900">
          🚧 Field Engineer Panel
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("currentUser");
            window.location.href = "/login";
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Logout
        </button>
      </div>

      {/* Card */}
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-6">

        {/* Step 1 */}
        <div className="p-4 bg-blue-50 rounded-xl border">
          <h2 className="font-semibold text-blue-800 mb-2">
            📍 Step 1: Capture Location
          </h2>

          <button
            onClick={captureLocation}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Get GPS Location
          </button>

          {location && (
            <p className="text-green-600 text-sm mt-2 font-mono">
              ✓ {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </p>
          )}
        </div>

        {/* Step 2 */}
        <div className="p-4 bg-gray-50 rounded-xl border">
          <h2 className="font-semibold text-gray-800 mb-2">
            📸 Step 2: Upload Photo
          </h2>

          <input
            type="file"
            accept="image/*"
            capture="environment"
            hidden
            ref={fileInputRef}
            onChange={handlePhotoUpload}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-lg"
          >
            Open Camera
          </button>

          {photo && (
            <img
              src={photo}
              className="mt-4 rounded-xl border shadow-md h-48 w-full object-cover"
            />
          )}
        </div>

        {/* Submit */}
        <button
          onClick={submitReport}
          className={`w-full py-3 rounded-xl font-bold text-lg text-white shadow-lg transition ${
            loading
              ? "bg-gray-400"
              : "bg-green-600 hover:bg-green-700 hover:scale-105"
          }`}
        >
          {loading ? "⏳ Processing..." : "🚀 Submit Report"}
        </button>
      </div>
    </div>
  );
}