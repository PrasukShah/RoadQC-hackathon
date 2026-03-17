"use client";
import React, { useState, useRef, useEffect } from 'react';

// --- Types ---
type Report = {
  id: string;
  timestamp: string;
  latitude: number | null;
  longitude: number | null;
  photoUrl: string | null;
  aiScore: number;
  isSpoofed: boolean;
};

// --- Target Coordinates (Simulated Road Project Location) ---
// For the demo, these are the "allowed" coordinates. 
const TARGET_LAT = 28.6139; // e.g., New Delhi
const TARGET_LNG = 77.2090;

export default function RoadQualityApp() {
  const [activeTab, setActiveTab] = useState<'engineer' | 'admin'>('engineer');
  const [reports, setReports] = useState<Report[]>([]);

  // Engineer State
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---
  const captureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => alert('Location access denied. Cannot proceed.')
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhoto(imageUrl);
    }
  };

  const submitReport = () => {
    if (!location || !photo) {
      alert("You must capture both your location and a live photo!");
      return;
    }

    setLoading(true);

    // Simulate AI processing & network request
    setTimeout(() => {
      // Mock logic: Check if they are faking their location
      // In a real app, use Haversine formula to check distance. 
      // Here, if they differ by > 0.1 degrees, flag as spoofed.
      const isSpoofed =
        Math.abs(location.lat - TARGET_LAT) > 0.1 ||
        Math.abs(location.lng - TARGET_LNG) > 0.1;

      const newReport: Report = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toLocaleString(),
        latitude: location.lat,
        longitude: location.lng,
        photoUrl: photo,
        aiScore: Math.floor(Math.random() * (95 - 40 + 1)) + 40, // Random score 40-95
        isSpoofed: isSpoofed,
      };

      setReports([newReport, ...reports]);
      setLocation(null);
      setPhoto(null);
      setLoading(false);
      alert("Inspection submitted successfully via Blockchain to Govt Portal!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans sm:p-8 p-4">
      {/* Header & Navigation */}
      <div className="max-w-4xl mx-auto mb-8 text-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Smart Road Inspector</h1>
        <p className="text-gray-500 mb-6">Anti-Bribery & AI Quality Assurance System</p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setActiveTab('engineer')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${activeTab === 'engineer' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Field Engineer View
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${activeTab === 'admin' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Govt. Admin Dashboard
          </button>
        </div>
      </div>

      {/* --- FIELD ENGINEER VIEW --- */}
      {activeTab === 'engineer' && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Submit Daily Inspection</h2>

          {/* Step 1: Location */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="font-semibold text-blue-900 mb-2">1. Verify Presence</p>
            <button
              onClick={captureLocation}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Secure GPS Coordinates
            </button>
            {location && (
              <p className="text-sm text-green-700 mt-2 font-mono">
                ✓ Recorded: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </p>
            )}
          </div>

          {/* Step 2: Camera */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="font-semibold text-blue-900 mb-2">2. Live Photo Evidence</p>
            <input
              type="file"
              accept="image/*"
              capture="environment" // Forces back camera on mobile
              className="hidden"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
            >
              Open Camera
            </button>
            {photo && (
              <img src={photo} alt="Road" className="mt-4 rounded-md border-2 border-green-500 w-full object-cover h-48" />
            )}
          </div>

          <button
            onClick={submitReport}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-lg text-white shadow-lg transition-transform hover:scale-105 ${loading ? 'bg-gray-400' : 'bg-green-600'}`}
          >
            {loading ? 'Committing to Blockchain...' : 'Sign & Submit Report'}
          </button>
        </div>
      )}

      {/* --- GOVERNMENT ADMIN VIEW --- */}
      {activeTab === 'admin' && (
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Live Audit Portal</h2>
            <div className="text-sm text-gray-500">Project: State Highway 42</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 border-b">Time</th>
                  <th className="p-3 border-b">Photo</th>
                  <th className="p-3 border-b">Location</th>
                  <th className="p-3 border-b">AI Quality Score</th>
                  <th className="p-3 border-b">Audit Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No reports submitted yet. Go to Engineer View to submit demo data.
                    </td>
                  </tr>
                ) : (
                  reports.map((report) => (
                    <tr key={report.id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-3 text-sm text-gray-600">{report.timestamp}</td>
                      <td className="p-3">
                        <img src={report.photoUrl || ''} className="w-16 h-16 rounded object-cover border" alt="thumbnail" />
                      </td>
                      <td className="p-3 font-mono text-xs text-gray-600">
                        {report.latitude?.toFixed(4)}, {report.longitude?.toFixed(4)}
                      </td>
                      <td className="p-3">
                        <div className={`font-bold ${report.aiScore > 75 ? 'text-green-600' : 'text-red-500'}`}>
                          {report.aiScore}/100
                        </div>
                        <div className="text-xs text-gray-500">Computer Vision Est.</div>
                      </td>
                      <td className="p-3">
                        {report.isSpoofed ? (
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold border border-red-300">
                            🚨 FRAUD (GPS Spoof)
                          </span>
                        ) : (
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-300">
                            ✓ Verified Present
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
