import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./Screens/Home/Home";
import ProductDetail from "./Screens/ProductDetail/ProductDetail";
import Register from "./Screens/Register/Register";
import Login from "./Screens/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Product from "./Screens/Product/Product";
import TestYub from "./components/TestYub/TestYub";

const App = () => {
  return (
    <BrowserRouter className="bg-white dark:bg-slate-900 text-black dark:text-white font-bai-jamjuree">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tour-du-lich"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route path="/tour-du-lich/:id" element={<ProductDetail />}/>
        <Route path="/dang-ky" element={<Register />} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/test" element={<TestYub />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
