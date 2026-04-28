import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setAuth } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const localUser = JSON.parse(localStorage.getItem("localUser"));

    if (
      localUser &&
      localUser.username === form.username &&
      localUser.password === form.password
    ) {
      const token = "local-token";
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(localUser));
      dispatch(setAuth({ user: localUser, token }));
      navigate("/dashboard");
      return;
    }

    const res = await dispatch(loginUser(form));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>

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

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
