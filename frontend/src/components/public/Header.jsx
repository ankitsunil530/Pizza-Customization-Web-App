import { Link, NavLink } from "react-router-dom";

function Header() {
  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-red-600" : "text-gray-700 hover:text-red-500"
    }`;

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        
        <Link to="/" className="text-xl font-extrabold text-red-600">
          🍕 PizzaApp
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/menu" className={linkClass}>Menu</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/login" className={linkClass}>Login</NavLink>

          <Link
            to="/register"
            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
