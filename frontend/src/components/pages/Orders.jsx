import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders/my", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(res.data.data);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const payNow = async (orderId) => {
    try {
      // 1️⃣ Create Razorpay order for existing order
      const paymentRes = await axios.post(
        "http://localhost:5000/api/payment/pay-existing-order",
        { orderId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      const { order, key } = paymentRes.data;

      // 2️⃣ Open Razorpay popup
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Pizza App",
        description: "Complete your payment",
        order_id: order.id,

        handler: async function (response) {
          // 3️⃣ Verify payment
          await axios.post(
            "http://localhost:5000/api/payment/verify",
            { ...response, orderId },
            { headers: { Authorization: `Bearer ${user.token}` } }
          );

          alert("Payment successful ✅");
          fetchOrders(); // reload orders
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
      alert("Payment failed ❌");
    }
  };

  if (loading) return <p className="p-6">Loading orders...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (orders.length === 0) return <p className="p-6">You have no orders yet 🍕</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>

      {orders.map((o) => (
        <div
          key={o._id}
          className="bg-gray-800 p-4 mb-4 rounded border border-gray-700"
        >
          <div className="flex justify-between">
            <span className="font-semibold">Order ID:</span>
            <span className="text-sm text-gray-400">
              {o._id.slice(-6)}
            </span>
          </div>

          <p className="mt-2">
            <strong>Total:</strong> ₹{o.totalAmount}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize">{o.orderStatus}</span>
          </p>

          <p>
            <strong>Payment:</strong>{" "}
            <span
              className={`capitalize ${
                o.paymentStatus === "pending"
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {o.paymentStatus}
            </span>
          </p>

          <p className="text-sm text-gray-400 mt-1">
            {new Date(o.createdAt).toLocaleString()}
          </p>

          {/* Items */}
          <div className="mt-3 border-t border-gray-700 pt-2">
            {o.items.map((item, i) => (
              <div key={i} className="text-sm text-gray-300">
                {item.name} ({item.size?.name}, {item.crust?.name}) × {item.qty}
              </div>
            ))}
          </div>

          {/* Pay Now Button */}
          {o.paymentStatus === "pending" && (
            <button
              onClick={() => payNow(o._id)}
              className="mt-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              Pay Now 💳
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Orders;
