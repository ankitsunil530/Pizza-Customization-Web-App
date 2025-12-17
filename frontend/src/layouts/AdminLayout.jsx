import { Outlet } from "react-router-dom";
import Header from "../admin/components/Header";
import Footer from "../admin/components/Footer";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="ml-64 p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AdminLayout;
