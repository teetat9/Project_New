"use client";

import { useState } from "react";

export default function AuthForm({ mode = "login" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    alert(`${mode} with: ${email}`);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === "register" && (
        <div>
          <label className="text-sm font-medium">Full name</label>
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand/50"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand/50"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium">Password</label>
        <input
          type="password"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand/50"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {mode === "login" && (
          <a href="/reset-password" className="text-xs text-brand hover:underline block mt-1">
            Forgot password?
          </a>
        )}
      </div>
      <button
        type="submit"
        className="w-full rounded-lg px-4 py-2 bg-brand text-white hover:bg-brand-dark shadow-soft"
      >
        {mode === "login" ? "Sign in" : "Create account"}
      </button>
    </form>
  );
}
