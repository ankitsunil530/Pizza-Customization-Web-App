import { Link } from "react-router-dom";
import { getPizzas } from "../../features/pizza/pizzaSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PizzaCard from "../PizzaCard";

function HomePage() {
  const dispatch = useDispatch();
  const { pizzas, isLoading } = useSelector((s) => s.pizza);
  const { user } = useSelector((s) => s.auth);

  useEffect(() => {
    dispatch(getPizzas());
  }, [dispatch]);

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-red-600 to-orange-500">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 items-center gap-10">

          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Build Your Perfect Pizza 🍕
            </h1>

            <p className="mt-4 text-lg text-red-100">
              Fresh ingredients • Custom toppings • Fast delivery • Secure payment
            </p>

            <div className="mt-6 flex gap-4">
              {!user && (
                <Link
                  to="/register"
                  className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Get Started
                </Link>
              )}

              <a
                href="#menu"
                className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
              >
                View Menu
              </a>
            </div>

            <div className="mt-6 flex gap-6 text-sm text-red-100">
              <span>⭐ 4.8 Rating</span>
              <span>🚚 30 min delivery</span>
              <span>💳 Secure payment</span>
            </div>
          </div>

          <div className="hidden md:block">
            <img
  src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg"
  alt="Pizza"
  className="rounded-xl shadow-lg w-full"
/>
          </div>

        </div>
      </section>

      {/* ================= MENU SECTION ================= */}
      <section id="menu" className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Pizzas</h2>
          <span className="text-gray-400 text-sm">
            {pizzas.length} items
          </span>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-800 h-60 rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {!isLoading && pizzas.length === 0 && (
          <p>No pizzas available.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pizzas.map((pizza) => (
            <PizzaCard key={pizza._id} pizza={pizza} />
          ))}
        </div>

      </section>

      {/* ================= WHY US ================= */}
      <section className="bg-gray-900 py-14">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-2xl font-bold text-center mb-10">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <div className="text-3xl mb-3">🍕</div>
              <h3 className="font-semibold mb-2">Fully Customizable</h3>
              <p className="text-gray-400 text-sm">
                Choose size, crust, cheese and toppings your way.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-400 text-sm">
                Hot and fresh pizzas delivered in under 30 minutes.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-400 text-sm">
                Razorpay protected payments with full encryption.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      {!user && (
        <section className="bg-black py-12 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Ready to order your first pizza?
          </h2>
          <p className="text-gray-400 mb-6">
            Sign up now and start customizing your meal.
          </p>
          <Link
            to="/register"
            className="bg-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-700"
          >
            Create Account
          </Link>
        </section>
      )}

    </div>
  );
}

export default HomePage;
