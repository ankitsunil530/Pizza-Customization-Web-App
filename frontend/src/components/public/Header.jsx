import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((s) => s.auth);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-red-600" : "text-gray-700 hover:text-red-500"
    }`;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-xl font-extrabold text-red-600">
          🍕 PizzaApp
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6">

          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/" className={linkClass}>Menu</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>

          {/* If NOT logged in */}
          {!user && (
            <>
              <NavLink to="/login" className={linkClass}>Login</NavLink>

              <Link
                to="/register"
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
              >
                Register
              </Link>
            </>
          )}

          {/* If logged in */}
          {user && (
            <>
              <span className="text-sm text-gray-600">
                Hi, <b>{user.name}</b>
              </span>

              <Link
                to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                className="text-sm font-medium text-gray-700 hover:text-red-500"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="text-lg hover:text-red-500"
            title="Cart"
          >
            🛒
          </Link>

        </nav>
      </div>
    </header>
  );
}

export default Header;
