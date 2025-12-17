import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center text-red-500">
          Create Account 🍕
        </h2>

        <form className="mt-6 space-y-4">

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
          />

          {/* Email */}
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
            />
            <button
              type="button"
              onClick={() => setOtpSent(true)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold"
            >
              Send OTP
            </button>
          </div>

          {/* OTP Input */}
          {otpSent && !otpVerified && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
              />
              <button
                type="button"
                onClick={() => setOtpVerified(true)}
                className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
              >
                Verify OTP
              </button>
            </div>
          )}

          {/* Password Section */}
          {otpVerified && (
            <>
              <input
                type="password"
                placeholder="Create Password"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
              />

              <button
                type="submit"
                className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
              >
                Create Account
              </button>
            </>
          )}
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

export default Signup;
