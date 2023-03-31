import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import OrderListPage from "./pages/OrderListPage";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Layout/Header";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
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
            {/* <Route element={<CheckoutPage />} path="/checkout:id?" /> */}
            <Route element={<CartPage />} path="/cart/:id?" />
            <Route element={<ShippingPage />} path="/shipping" />
            <Route element={<PaymentPage />} path="/payment" />
            <Route element={<PlaceOrderPage />} path="/placeorder" />
            <Route element={<OrderPage />} path="/order/:id" />

            <Route element={<UserListPage />} path="/admin/userlist" />
            <Route element={<UserEditPage />} path="/admin/user/:id/edit" />

            <Route element={<ProductListPage />} path="/admin/productlist" />
            <Route
              element={<ProductEditPage />}
              path="/admin/product/:id/edit"
            />

            <Route element={<OrderListPage />} path="/admin/orderlist" />
          </Routes>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
