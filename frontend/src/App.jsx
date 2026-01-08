import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./Screens/Home/Home";
import ProductDetail from "./Screens/ProductDetail/ProductDetail";
import Register from "./Screens/Register/Register";
import Login from "./Screens/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Product from "./Screens/Product/Product";
import Booking from "./Screens/booking/Booking";
import TestYub from "./components/TestYub/TestYub";
import Confirm from "./Screens/Confirm/Confirm";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import About from "./Screens/about/About";
import UserInfo from "./Screens/userInfo/UserInfo";
import "./App.css";


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/tour-du-lich"
          element={
              <Product />
          }
        />
        <Route
          path="/tour-du-lich/:slug"
          element={
              <ProductDetail />
          }
        />
        <Route path="/dang-ky" element={<Register />} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/test" element={<TestYub />} />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/confirm"
          element={
            <ProtectedRoute>
              <Confirm />
            </ProtectedRoute>
          }
        />
        <Route path="/gioi-thieu" element={<About />} />
        <Route
          path="/info"
          element={
            <ProtectedRoute>
              <UserInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
