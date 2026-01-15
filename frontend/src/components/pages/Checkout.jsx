import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Checkout() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { user } = useSelector((s) => s.auth);
  const { cart } = useSelector((s) => s.cart);

  useEffect(() => {
    if (!user) navigate("/login");
    if (!cart || cart.items.length === 0) navigate("/cart");
  }, [user, cart, navigate]);

  const subtotal = cart?.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  ) || 0;

  const deliveryFee = 40;
  const total = subtotal + deliveryFee;

  const placeOrder = async () => {
    if (!address.trim()) {
      setError("Please enter delivery address");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Create order
      const orderRes = await axios.post(
        `${import.meta.env.VITE_API_URL||"http://localhost:5000/api"}/orders`,
        { address },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      const orderId = orderRes.data.data._id;

      // Create Razorpay order
      const paymentRes = await axios.post(
        `${import.meta.env.VITE_API_URL||"http://localhost:5000/api"}/payment/create-order`,
        { orderId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      const { order, key } = paymentRes.data;

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Pizza App",
        description: "Pizza Order Payment",
        order_id: order.id,

        handler: async function (response) {
          await axios.post(
            `${import.meta.env.VITE_API_URL||"http://localhost:5000/api"}/payment/verify`,
            { ...response, orderId },
            { headers: { Authorization: `Bearer ${user.token}` } }
          );

          navigate("/orders");
        },

        prefill: {
          name: user.name,
          email: user.email,
        },

        theme: { color: "#ef4444" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error(err);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!cart) return null;

  return (
    <div className="bg-gray-900 min-h-screen py-10 px-4 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* LEFT – Address & Payment */}
        <div className="md:col-span-2 bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>

          <label className="block mb-2 text-sm text-gray-300">
            Delivery Address
          </label>

          <textarea
            placeholder="House no, street, city, pincode..."
            className="w-full p-3 text-black rounded mb-3"
            rows="4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {error && (
            <p className="text-red-500 mb-3">{error}</p>
          )}

          <button
            onClick={placeOrder}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-600"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Processing Payment..." : "Pay Securely with Razorpay 💳"}
          </button>

          <p className="text-xs text-gray-400 mt-3">
            🔒 Your payment is securely processed by Razorpay
          </p>
        </div>

        {/* RIGHT – Order Summary */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg h-fit sticky top-6">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          <div className="space-y-2 text-sm">
            {cart.items.map((item) => (
              <div key={item._id} className="flex justify-between text-gray-300">
                <span>{item.name} × {item.qty}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 my-4"></div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹{deliveryFee}</span>
            </div>

            <div className="flex justify-between text-lg font-bold text-red-500 mt-2">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;
