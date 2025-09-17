// components/LoginForm.jsx
'use client';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState('');

  // Use env var if set, else default to local dev
  const API = 'http://localhost:8000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    if (!email || !password) {
      setErr('Email and password are required.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API}/users/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || 'Login failed');
      }

      const data = await res.json();
      // Persist simple session info for later (e.g., reset-password page)
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem('userName', data.user.name || '');

      // Navigate to your dashboard/home
      window.location.href = '/dashboard';
    } catch (e) {
      setErr(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
      {/* Error banner (small) */}
      {err ? (
        <div className="w-full max-w-sm text-red-600 text-sm text-center">{err}</div>
      ) : null}

      {/* Username / Email */}
      <div className="w-full max-w-sm">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username / Email
        </label>
        <input
          type="email"
          placeholder="exampla@gmail.com"
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      {/* Password */}
      <div className="w-full max-w-sm">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <div className="text-right mt-1">
          <a href="/reset-password" className="text-xs text-blue-500 hover:underline">
            Create New Password?
          </a>
        </div>
      </div>

      {/* Sign In button */}
      <button
        type="submit"
        disabled={submitting}
        className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white py-2 px-8 rounded-full font-semibold transition mx-auto block w-full max-w-sm"
      >
        {submitting ? 'Signing in...' : 'SIGN IN'}
      </button>

      {/* Google Sign In button (placeholder) */}
      <button
        type="button"
        disabled
        title="Coming soon"
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-2 px-8 rounded-full font-semibold transition mx-auto block w-full max-w-sm"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
          alt="Google"
          className="h-5 w-5"
        />
        SIGN IN WITH GOOGLE
      </button>

      {/* Sign Up link */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Don’t have an account?{' '}
        <a href="/register" className="text-blue-500 hover:underline">
          Sign Up
        </a>
      </p>
    </form>
  );
}
