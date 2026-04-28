import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex flex-wrap justify-between items-center gap-4">
      <div className="font-semibold text-lg">Redux Product App</div>

      {token ? (
        <div className="flex flex-wrap items-center gap-4">
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/products" className="hover:text-gray-300">
            Products
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-4">
          <Link to="/" className="hover:text-gray-300">
            Login
          </Link>
          <Link to="/register" className="hover:text-gray-300">
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
