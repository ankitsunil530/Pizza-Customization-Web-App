import { Outlet } from "react-router-dom";
import Header from "../user/components/Header";
import Footer from "../user/components/Footer";

function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default UserLayout;
