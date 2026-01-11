import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, resetAuthState } from "../../features/auth/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      dispatch(resetAuthState());
    }
  }, [isSuccess, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    dispatch(register({ name, email, password }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center text-red-500">
          Create Account 🍕
        </h2>

        {isError && (
          <p className="text-red-500 text-center mt-2">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={onChange}
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={onChange}
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={password}
            onChange={onChange}
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={onChange}
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-red-600 rounded-lg font-semibold"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
