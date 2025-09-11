// /pages/register.jsx
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }
    alert(`Registering ${form.username} / ${form.email}`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-10 min-h-screen flex items-center">
        <div className="grid gap-12 md:grid-cols-[520px,1fr] items-stretch">
          {/* Left glass panel */}
          <div className="rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl p-10 flex flex-col min-h-[80vh]">
            <div className="pt-2">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-black/90 drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]">
                <span className="block">Welcome to</span>
                <span className="block">Register page.</span>
              </h1>
              <p className="mt-6 text-gray-700">
                Let us know who you are
              </p>
            </div>

            <div className="mt-auto flex items-center gap-3">
              <img src="/images/logo_alone.png" alt="Logo" className="h-10 w-auto" />
              <span className="text-gray-700">
                A truly classroom for students.
              </span>
            </div>
          </div>

          {/* Right form column (no box, just fields) */}
          <div className="flex items-start md:items-center">
            <form
              onSubmit={handleSubmit}
              className="w-full min-w-[450px] max-w-xxl space-y-6 md:ml-4"
            >
              {/* Username */}
              <div>
                <label className="block text-gray-800 font-medium mb-1">
                  Create Username
                </label>
                <input
                  name="username"
                  type="text"
                  placeholder="ABC..."
                  value={form.username}
                  onChange={handleChange}
                  className="w-full h-14 rounded-full bg-gray-200/60 border border-gray-300 px-5 text-base shadow-inner placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-800 font-medium mb-1">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full h-12 rounded-full bg-gray-200/60 border border-gray-300 px-5 shadow-inner placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-800 font-medium mb-1">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full h-12 rounded-full bg-gray-200/60 border border-gray-300 px-5 shadow-inner placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-800 font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  name="confirm"
                  type="password"
                  placeholder="••••••••"
                  value={form.confirm}
                  onChange={handleChange}
                  className="w-full h-12 rounded-full bg-gray-200/60 border border-gray-300 px-5 shadow-inner placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Submit + helper */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 h-10 shadow-md"
                >
                  SIGN IN
                </button>

                <p className="mt-3 text-sm text-gray-700">
                  Already have account?{" "}
                  <a href="/login" className="text-blue-600 hover:underline">
                    Sign In here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
