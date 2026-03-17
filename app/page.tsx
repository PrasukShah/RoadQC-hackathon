"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Road Quality Checker</h1>

      <button
        onClick={() => router.push("/login")}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Login
      </button>

      <button
        onClick={() => router.push("/signup")}
        className="bg-gray-800 text-white px-6 py-2 rounded"
      >
        Signup
      </button>
    </div>
  );
}