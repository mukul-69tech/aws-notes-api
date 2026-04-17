import { useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    setUser(res.user);
  };

  const login = async () => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    setUser(res.user);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#1e1b4b] via-[#4c1d95] to-[#0f172a]">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl text-center w-80">
        <h1 className="text-3xl font-bold text-white mb-5">
          Auth + Notes 🔥
        </h1>

        <input
          className="w-full p-3 mb-3 rounded-lg bg-white/20 text-white placeholder-gray-300"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={signup}
            className="bg-green-500 px-4 py-2 rounded text-white w-full"
          >
            Signup
          </button>
          <button
            onClick={login}
            className="bg-blue-500 px-4 py-2 rounded text-white w-full"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;