import "./App.css";

import { ToastProvider } from "react-toast-notifications";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Orders from "./pages/order/Orders";
import Profile from "./pages/Profile/profile";
import LoginUser from "./pages/login/LoginUser";
import RegisterUser from "./pages/Register/RegisterUser";
import DataCategory from "./pages/dataSetting/DataCategory";
import DataTag from "./pages/dataSetting/DataTag";
import DataProduct from "./pages/dataSetting/DataProduct";
import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import ConfirmPage from "./pages/confirm/ConfirmPage";
import Testing from "./testing/Testing";
import InvoicePage from "./pages/invoice/InvoicePage";
function App() {
  return (
    <>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/data-category" element={<DataCategory />} />
          <Route path="/data-tag" element={<DataTag />} />
          <Route path="/data-product" element={<DataProduct />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirm" element={<ConfirmPage />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/invoice/:orderId" element={<InvoicePage />} />
        </Routes>
      </ToastProvider>
    </>
  );
}

export default App;
