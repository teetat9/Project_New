'use client';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in with email: ${email}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
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
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-8 rounded-full font-semibold transition mx-auto block w-full max-w-sm"
      >
        SIGN IN
      </button>

      {/* Google Sign In button */}
      <button
        type="button"
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-8 rounded-full font-semibold transition mx-auto block w-full max-w-sm"
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
