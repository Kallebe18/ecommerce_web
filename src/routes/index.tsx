import { Outlet, Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import { Cart } from "../pages/Cart";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Orders } from "../pages/Orders";
import { Profile } from "../pages/Profile";
import { PasswordRecovery } from "../pages/PasswordRecovery";
import { Register } from "../pages/Register";
import { PasswordChange } from "../pages/PasswordChange";

const HeaderWrapper = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HeaderWrapper />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/recover">
          <Route index element={<PasswordRecovery />} />
          <Route path="password" element={<PasswordChange />} />
        </Route>
        <Route path="profile" element={<Profile />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}
