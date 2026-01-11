import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, resetAuthState } from "../../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Redirect after login
  useEffect(() => {
    if (isSuccess && user) {
      const target =
        user.role === "admin" ? "/admin/dashboard" : "/dashboard";

      navigate(target);
      dispatch(resetAuthState());
    }
  }, [isSuccess, user, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center text-red-500">
          Login to PizzaApp 🍕
        </h2>

        {isError && (
          <p className="text-red-500 text-center mt-2">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-red-600 rounded-lg font-semibold"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-red-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
