import { Link } from "react-router-dom";

function PizzaCard({ pizza }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <img src={pizza.image} className="h-40 w-full object-cover rounded" />

      <h3 className="mt-2 text-lg font-bold">{pizza.name}</h3>
      <p className="text-sm text-gray-400">{pizza.description}</p>

      <p className="mt-2 text-red-500 font-bold">₹{pizza.basePrice}</p>

      <Link
        to={`/pizza/${pizza._id}`}
        className="block mt-3 bg-red-600 text-center py-2 rounded"
      >
        Customize
      </Link>
    </div>
  );
}

export default PizzaCard;
