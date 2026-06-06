import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/money";

const FALLBACK_IMAGES = {
  "Margherita": "https://cdn.uengage.io/uploads/5/image-342266-1715596630.png",
  "Margherita ": "https://www.foodandwine.com/thmb/7A7CYdDEKJUUhNcLSrlZ5N8wbHo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/mozzarella-pizza-margherita-FT-RECIPE0621-11fa41ceb1a5465d9036a23da87dd3d4.jpg",
  "Veg Supreme": "https://pforpizza.in/wp-content/uploads/2023/12/IMG-20231216-WA0018.jpg",
  "Margherita Supreme": "https://allforpizza.com/wp-content/uploads/2022/07/1460A7EC-CF3B-40E8-B05F-A21E12E85EC6.jpeg",
};

const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80";

function PizzaCard({ pizza }) {
  const lowestSize = pizza.sizes?.[0];
  const rating = Number(pizza.rating || 0);

  const imageSrc =
    pizza.image ||
    FALLBACK_IMAGES[pizza.name] ||
    DEFAULT_FALLBACK;

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-orange-300/50 hover:bg-white/[0.09]">
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageSrc}
          alt={pizza.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              FALLBACK_IMAGES[pizza.name] || DEFAULT_FALLBACK;
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-emerald-400 px-3 py-1 text-xs font-bold text-emerald-950 shadow-lg">
          Freshly baked
        </span>

        <span className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-amber-200 backdrop-blur">
          ★ {rating ? rating.toFixed(1) : "New"}
        </span>

        <p className="absolute bottom-4 left-4 rounded-2xl bg-black/55 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
          From {formatCurrency((pizza.basePrice || 0) + (lowestSize?.price || 0))}
        </p>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-xl font-extrabold text-white">{pizza.name}</h3>
          <p className="mt-2 min-h-12 text-sm leading-6 text-slate-300">{pizza.description}</p>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm text-slate-300">
          <span className="text-amber-300">{rating ? "★".repeat(Math.round(rating)) : "☆☆☆☆☆"}</span>
          <span>{pizza.numReviews || 0} reviews</span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-slate-200">
          {(pizza.sizes || []).slice(0, 3).map((size) => (
            <span key={size.name} className="rounded-full border border-white/10 bg-white/10 px-3 py-1">
              {size.name}
            </span>
          ))}
        </div>

        <Link
          to={`/pizza/${pizza._id}`}
          className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 px-5 py-3 font-bold text-white shadow-lg shadow-red-950/30 transition hover:from-red-400 hover:to-orange-400"
        >
          Customize Now →
        </Link>
      </div>
    </article>
  );
}

export default PizzaCard;
