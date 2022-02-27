import { Outlet, Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

const AdminPagesWrapper = () => {
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
      <Route path="/" element={<AdminPagesWrapper />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
