"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "./services/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (searchParams.get("logout") === "true") {
      toast.info("Berhasil logout.");
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(username, password);

      if (data.metaData.code === 200) {
        localStorage.setItem("token", data.response.token);
        toast.success("Login berhasil!", {
          autoClose: 1800,
          onClose: () => router.push("/group"),
        });
      } else {
        toast.error("Login gagal. Periksa kembali.");
      }
    } catch (error) {
      toast.error(error.message || "Terjadi kesalahan saat login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 hp:px-5">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          LOGIN
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 px-4 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
