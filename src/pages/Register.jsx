import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username.trim() || !form.password.trim()) {
      setError("Username and password are required.");
      return;
    }

    dispatch(registerUser(form));
    setError("");
    alert("Registered successfully!");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          type="text"
          value={form.username}
          placeholder="Username"
          className="border p-2 w-full mb-3"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          value={form.password}
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <button className="bg-green-500 text-white w-full py-2">Register</button>
      </form>
    </div>
  );
}
