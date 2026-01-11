import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeItem } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((s) => s.cart);
  const { user } = useSelector((s) => s.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(fetchCart());
  }, [dispatch, user, navigate]);

  const calculateTotal = () => {
    if (!cart) return 0;
    return cart.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  };

  if (!cart) return <p className="p-6 text-center text-white">Loading cart...</p>;

  if (cart.items.length === 0)
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <p className="text-2xl mb-4">🛒 Your cart is empty</p>
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 px-6 py-2 rounded hover:bg-red-700"
        >
          Browse Pizzas
        </button>
      </div>
    );

  const total = calculateTotal();
  const deliveryFee = 40;
  const grandTotal = total + deliveryFee;

  return (
    <div className="bg-gray-900 min-h-screen py-10 px-4 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* LEFT - Cart Items */}
        <div className="md:col-span-2 space-y-4">

          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

          {cart.items.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-400">
                  Size: {item.size?.name} | Crust: {item.crust?.name}
                </p>
                <p className="text-sm text-gray-300 mt-1">
                  ₹{item.price} × {item.qty}
                </p>
              </div>

              <button
                onClick={() => dispatch(removeItem(item._id))}
                className="text-red-400 hover:text-red-600 text-sm"
              >
                Remove ✕
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT - Summary */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg h-fit sticky top-6">

          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹{deliveryFee}</span>
            </div>

            <div className="border-t border-gray-700 my-2"></div>

            <div className="flex justify-between text-lg font-bold text-red-500">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition"
          >
            Proceed to Checkout →
          </button>
        </div>

      </div>
    </div>
  );
}

export default Cart;
