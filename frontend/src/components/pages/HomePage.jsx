import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Customize Your <span className="text-red-500">Dream Pizza 🍕</span>
        </h1>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Choose base, toppings, cheese & get freshly baked pizza delivered to your doorstep.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
          >
            Get Started
          </Link>
          <Link
            to="/pizzastore"
            className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800"
          >
            View Menu
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
        {[
          { title: "Fully Customizable", desc: "Base, sauce, toppings – you decide everything." },
          { title: "Fast Delivery", desc: "Hot & fresh pizza delivered quickly." },
          { title: "Admin Dashboard", desc: "Owners can manage orders & inventory easily." },
        ].map((f, i) => (
          <div key={i} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold text-red-500">{f.title}</h3>
            <p className="mt-2 text-gray-400">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default HomePage;
