import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
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
          </Routes>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
