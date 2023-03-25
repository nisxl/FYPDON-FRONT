import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import OrderPage from "./pages/OrderPage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <div className="App">
      <Router>
        <CartProvider>
          <Routes>
            {/* <Route element={<PrivateRoutes />}> */}
            <Route>
              <Route element={<HomePage />} path="/" exact />
            </Route>
            <Route element={<LoginPage />} path="/login" />
            <Route element={<RegisterPage />} path="/register" />
            {/* <Route element={<ProductPage />} path="/product" /> */}
            <Route element={<ProductPage />} path="/product/:id" />

            <Route element={<ProfilePage />} path="/profile" />
            <Route element={<CheckoutPage />} path="/checkout" />
            <Route element={<ShippingPage />} path="/shipping" />
            <Route element={<PaymentPage />} path="/payment" />
            <Route element={<OrderPage />} path="/order" />
          </Routes>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
