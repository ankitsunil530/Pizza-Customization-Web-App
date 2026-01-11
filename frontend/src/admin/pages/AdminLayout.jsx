import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

export default function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded transition ${
      isActive ? "bg-red-600 text-white" : "hover:bg-gray-700"
    }`;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-5 flex flex-col">

        <div>
          <h2 className="text-xl font-bold text-red-500 mb-6">🍕 PizzaApp Admin</h2>

          <nav className="space-y-2">
            <NavLink to="/admin/dashboard" className={linkClass}>
              📊 Dashboard
            </NavLink>

            <NavLink to="/admin/orders" className={linkClass}>
              📦 Orders
            </NavLink>

            <NavLink to="/admin/pizzas" className={linkClass}>
              🍕 Pizzas
            </NavLink>

            <NavLink to="/admin/toppings" className={linkClass}>
              🧀 Toppings
            </NavLink>

            <NavLink to="/admin/users" className={linkClass}>
              👥 Users
            </NavLink>
          </nav>
        </div>

        {/* Admin info + logout */}
        <div className="mt-auto pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400 mb-2">
            Logged in as
          </p>
          <p className="font-semibold">{user?.name}</p>

          <button
            onClick={handleLogout}
            className="mt-3 w-full bg-red-600 hover:bg-red-700 py-2 rounded text-sm"
          >
            Logout
          </button>
        </div>

      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
