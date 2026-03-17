"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u: any) => u.email === form.email && u.password === form.password
    );

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user.role === "contractor") {
      router.push("/contractor");
    } else if (user.role === "inspector") {
      router.push("/inspector");
    } else {
      router.push("/engineer");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <h2 className="text-2xl font-bold">Login</h2>

      <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} className="border p-2"/>
      <input type="password" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})} className="border p-2"/>

      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </div>
  );
}