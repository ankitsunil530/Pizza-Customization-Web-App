import { NavLink } from "react-router-dom";

function Header() {
  const linkClass = ({ isActive }) =>
    `text-sm ${
      isActive ? "text-red-400" : "text-gray-300 hover:text-white"
    }`;

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="px-6 h-16 flex justify-between items-center">
        
        <h1 className="text-lg font-bold">
          🍕 PizzaApp Admin
        </h1>

        <nav className="flex items-center gap-6">
          <NavLink to="/admin/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/admin/orders" className={linkClass}>Orders</NavLink>
          <NavLink to="/admin/inventory" className={linkClass}>Inventory</NavLink>
          <NavLink to="/admin/users" className={linkClass}>Users</NavLink>

          <button className="text-red-400 font-semibold hover:text-red-500">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
