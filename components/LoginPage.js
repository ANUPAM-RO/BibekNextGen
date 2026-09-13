import { useRouter } from "next/router";
import React, { useState } from "react";
import { Building2, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { setAuthenticated } from "@/lib/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (event) => {
    event.preventDefault();
    if (
      email === process.env.NEXT_PUBLIC_LOGIN_EMAIL &&
      password === process.env.NEXT_PUBLIC_LOGIN_PASSWORD
    ) {
      setError("");
      setAuthenticated();
      router.push("/home");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="h-14 w-14 rounded-2xl bg-primary text-primary-content flex items-center justify-center shadow-soft">
            <Building2 size={28} />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-800 text-center">
            Bibek <span className="text-primary">NextGen</span>
          </h1>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mt-0.5">
            Technologies
          </p>
          <p className="text-slate-500 text-sm mt-3">
            Sign in to your dashboard
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-base-100 rounded-2xl shadow-soft border border-slate-100 p-8"
        >
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-error font-medium mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-primary py-3 font-semibold text-primary-content shadow-soft transition hover:brightness-110 active:scale-[0.99]"
          >
            Log in
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
