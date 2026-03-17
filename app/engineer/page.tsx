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

  // 🔐 Protect Route
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
      () => alert("Location permission denied")
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const submitReport = () => {
    if (!location || !photo) {
      alert("Capture location and photo!");
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

      alert("Report submitted!");
    }, 1500);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Engineer Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("currentUser");
            window.location.href = "/login";
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        {/* Location */}
        <button
          onClick={captureLocation}
          className="w-full bg-blue-600 text-white py-2 rounded mb-4"
        >
          Capture Location
        </button>

        {location && (
          <p className="text-green-600 text-sm">
            {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </p>
        )}

        {/* Camera */}
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
          className="w-full bg-black text-white py-2 rounded mt-4"
        >
          Open Camera
        </button>

        {photo && <img src={photo} className="mt-4 rounded" />}

        {/* Submit */}
        <button
          onClick={submitReport}
          className="w-full bg-green-600 text-white py-3 rounded mt-6"
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </div>
    </div>
  );
}