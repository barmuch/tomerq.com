"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Redirect ke home jika sudah login
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (isRegister) {
      // Registrasi
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registrasi berhasil, silakan login!");
        setIsRegister(false);
      } else {
        setErrorMessage(data.message || "Registrasi gagal!");
      }
    } else {
      // Login
      if (status === "authenticated") {
        router.push("/");
        return;
      }

      console.log("Mengirim email dan password:", email, password);

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // Jangan redirect otomatis agar bisa menangani error
      });

      console.log("Response dari signIn:", res);

      if (res?.error) {
        setErrorMessage(res.error || "Login gagal! Periksa kembali email dan password.");
      } else {
        router.push("/");
      }
    }

    setLoading(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="h-1/12 w-full bg-primary1 text-primary2"></div>
      <div className="flex-1 bg-gradient-to-b from-primary1 to-hover2 py-5 border-t-2 border-primary2">
        <div className="flex flex-col h-full gap-4 py-5 w-11/12 md:w-1/4 bg-primary2 mx-auto rounded-lg px-4">
          <div className="items-center content-center flex-col flex my-auto gap-6">
            <div className="text-3xl font-semibold text-black text-center">
              {isRegister ? "Register" : "Login"}
            </div>

            {errorMessage && (
              <div className="text-red-500 text-sm text-center">{errorMessage}</div>
            )}

            <form onSubmit={handleAuth} className="flex flex-col gap-4 w-full">
              {isRegister && (
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="p-2 border rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email"
                className="p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-primary1 text-white p-2 rounded"
                disabled={loading}
              >
                {loading ? "Processing..." : isRegister ? "Register" : "Login"}
              </button>
            </form>

            <div
              className="w-3/5 border-black border-2 p-3 rounded-lg text-center flex flex-row gap-2 pl-6 divide-x cursor-pointer"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <Image src="/google.png" alt="Google Login" width={24} height={24} />
              <div className="pl-2">Google</div>
            </div>

            <p
              className="text-sm cursor-pointer text-blue-500"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Sudah punya akun? Login" : "Belum punya akun? Register"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;