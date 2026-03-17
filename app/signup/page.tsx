"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "", role: "engineer" });
  const router = useRouter();

  const handleSignup = () => {
  if (!validate()) return;

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  users.push(form);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful!");
  router.push("/login");
};

  const validate = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;

  const { email, password } = form;

  if (!emailRegex.test(email) && !phoneRegex.test(email)) {
    alert("Invalid email or phone number");
    return false;
  }

  if (!passwordRegex.test(password)) {
    alert("Password must contain number & special character");
    return false;
  }

  return true;
};

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <h2 className="text-2xl font-bold">Signup</h2>

      <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} className="border p-2"/>
      <input type="password" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})} className="border p-2"/>

      <select onChange={(e) => setForm({...form, role: e.target.value})} className="border p-2">
        <option value="engineer">Engineer</option>
        <option value="contractor">Contractor</option>
        <option value="inspector">Inspector</option>
      </select>

      <button onClick={handleSignup} className="bg-green-600 text-white px-4 py-2 rounded">
        Signup
      </button>
    </div>
  );
}