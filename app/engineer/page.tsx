"use client";
import { useState, useEffect } from "react";

export default function EngineerPage() {
  const [video, setVideo] = useState("");
  const [location, setLocation] = useState("");
  const [materialQuality, setMaterialQuality] = useState("");
  const [roadQuality, setRoadQuality] = useState("");
  const [showMetrics, setShowMetrics] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
          );
          const data = await res.json();

          setLocation(
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "Unknown Location"
          );
        } catch {
          setLocation("Location fetch failed");
        }
      });
    }
  }, []);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      setVideo(reader.result as string);
      setShowMetrics(true);
    };

    reader.readAsDataURL(file);
  }
};

  const handleSubmit = () => {
    if (!video) return alert("Upload video first");
    if (!materialQuality || !roadQuality)
      return alert("Enter quality metrics");

    const report = {
      id: Date.now(), // ✅ FIX
      locationName: location, // ✅ FIX (match other pages)
      videoUrl: video, // ✅ FIX
      materialQuality,
      roadQuality,
      timestamp: new Date().toLocaleString(),
      status:
        Number(materialQuality) < 50 || Number(roadQuality) < 50
          ? "Poor ❌"
          : "Good ✅",
    };

    const reports = JSON.parse(localStorage.getItem("reports") || "[]");
    reports.push(report);
    localStorage.setItem("reports", JSON.stringify(reports));

    alert("Submitted ✅");

    setVideo("");
    setMaterialQuality("");
    setRoadQuality("");
    setShowMetrics(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-xl">

        <h2 className="text-2xl font-bold text-center mb-4">
          Engineer Upload
        </h2>

        <input
          value={location}
          readOnly
          className="w-full border p-3 rounded mb-4 bg-gray-100"
        />

        <label className="block p-6 border-2 border-dashed rounded text-center cursor-pointer">
          Upload Video
          <input type="file" accept="video/*" hidden onChange={handleVideoUpload}/>
        </label>

        {video && (
          <video src={video} controls className="w-full mt-4 rounded"/>
        )}

        {showMetrics && (
          <div className="mt-4 space-y-2">
            <input
              type="number"
              placeholder="Material Quality"
              onChange={(e) => setMaterialQuality(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Road Quality"
              onChange={(e) => setRoadQuality(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-2 mt-4 rounded"
        >
          Submit
        </button>

      </div>
    </div>
  );
}