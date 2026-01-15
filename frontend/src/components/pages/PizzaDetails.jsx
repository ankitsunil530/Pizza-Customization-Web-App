import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { fetchPizzaById } from "../../features/pizza/pizzaService";
import { addItemToCart } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function PizzaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((s) => s.auth);

  const [pizza, setPizza] = useState(null);
  const [size, setSize] = useState(null);
  const [crust, setCrust] = useState(null);
  const [toppings, setToppings] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const pizzaData = await fetchPizzaById(id);
        setPizza(pizzaData);

        const toppingRes = await axios.get(`${import.meta.env.VITE_API_URL||"http://localhost:5000/api"}/toppings`);
        setToppings(toppingRes.data.data);
      } catch {
        alert("Failed to load pizza data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const toggleTopping = (t) => {
    if (selectedToppings.some((x) => x._id === t._id)) {
      setSelectedToppings(selectedToppings.filter((x) => x._id !== t._id));
    } else {
      setSelectedToppings([...selectedToppings, t]);
    }
  };

  const calculatePrice = () => {
    if (!pizza) return 0;
    let total = pizza.basePrice;
    if (size) total += size.price;
    if (crust) total += crust.price;
    selectedToppings.forEach((t) => (total += t.price));
    return total;
  };

  const addToCartHandler = () => {
    if (!user) return navigate("/login");
    if (!size || !crust) return alert("Please select size & crust");

    const item = {
      pizzaId: pizza._id,
      name: pizza.name,
      size,
      crust,
      toppings: selectedToppings,
      price: calculatePrice(),
      qty: 1,
    };

    dispatch(addItemToCart(item));
    navigate("/cart");
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!pizza) return <p className="p-6 text-center">Pizza not found</p>;

  return (
    <div className="bg-gray-900 min-h-screen text-white py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {/* LEFT – Image & Info */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <img
            src={pizza.image || "https://source.unsplash.com/600x400/?pizza"}
            alt={pizza.name}
            className="rounded-lg w-full h-64 object-cover"
          />

          <h2 className="text-3xl font-bold mt-4">{pizza.name}</h2>
          <p className="text-gray-400 mt-2">{pizza.description}</p>

          <p className="mt-3 text-lg">
            Base Price: <span className="text-red-500 font-bold">₹{pizza.basePrice}</span>
          </p>
        </div>

        {/* RIGHT – Customization */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg space-y-6">

          {/* Size */}
          <div>
            <h3 className="font-semibold mb-2">Choose Size</h3>
            <div className="flex gap-2 flex-wrap">
              {pizza.sizes.map((s) => (
                <button
                  key={s.name}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    size?.name === s.name
                      ? "bg-red-600 border-red-500"
                      : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                  }`}
                >
                  {s.name} (+₹{s.price})
                </button>
              ))}
            </div>
          </div>

          {/* Crust */}
          <div>
            <h3 className="font-semibold mb-2">Choose Crust</h3>
            <div className="flex gap-2 flex-wrap">
              {pizza.crusts.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setCrust(c)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    crust?.name === c.name
                      ? "bg-red-600 border-red-500"
                      : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                  }`}
                >
                  {c.name} (+₹{c.price})
                </button>
              ))}
            </div>
          </div>

          {/* Toppings */}
          <div>
            <h3 className="font-semibold mb-2">Extra Toppings</h3>
            <div className="grid grid-cols-2 gap-2">
              {toppings.map((t) => (
                <label
                  key={t._id}
                  className="flex items-center gap-2 bg-gray-700 p-2 rounded-lg cursor-pointer hover:bg-gray-600"
                >
                  <input
                    type="checkbox"
                    checked={selectedToppings.some((x) => x._id === t._id)}
                    onChange={() => toggleTopping(t)}
                  />
                  <span>
                    {t.name} (+₹{t.price})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-900 p-4 rounded-lg flex justify-between items-center">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl text-red-500 font-bold">₹{calculatePrice()}</span>
          </div>

          {/* Add to cart */}
          <button
            onClick={addToCartHandler}
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg text-lg font-semibold transition"
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaDetails;
