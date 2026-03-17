"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const { email, password } = form;

    // ✅ Validation
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // ✅ Support email OR phone login
    const user = users.find(
      (u: any) =>
        (u.email === email || u.phone === email) &&
        u.password === password
    );

    if (!user) {
      setError("Invalid credentials");
      return;
    }

    setError("");
    localStorage.setItem("currentUser", JSON.stringify(user));

    // ✅ Role-based routing
    if (user.role === "contractor") {
      router.push("/contractor");
    } else if (user.role === "inspector") {
      router.push("/inspector");
    } else {
      router.push("/engineer");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-50">

      <h2 className="text-2xl font-bold text-gray-900">Login</h2>

      <input
        placeholder="Email or Phone"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border p-2 rounded w-64 text-gray-700"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border p-2 rounded w-64 text-gray-700"
      />

      {/* ✅ Error Message UI */}
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}