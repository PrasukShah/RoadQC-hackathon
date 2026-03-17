"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "", role: "engineer" });
  const router = useRouter();

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <h2 className="text-2xl font-bold">Signup</h2>

      <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} className="border p-2"/>
      <input type="password" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})} className="border p-2"/>

      <select onChange={(e) => setForm({...form, role: e.target.value})} className="border p-2">
        <option value="engineer">Engineer</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={handleSignup} className="bg-green-600 text-white px-4 py-2 rounded">
        Signup
      </button>
    </div>
  );
}