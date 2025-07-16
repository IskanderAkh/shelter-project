import { Route, Routes, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Shop from "./pages/Shop/Shop";
import Blog from "./pages/Blog/Blog";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import ProductPage from "./pages/Shop/ProductPage/ProductPage";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import Checkout from "./pages/Checkout/Checkout";
import Register from "./pages/Auth/Register/Register";
import Auth from "./pages/Auth/Auth";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer/Footer";
import ShopCarousel from "./components/ShopCarousel/ShopCarousel";
import Dashboard from "./pages/Dashboard/Dashboard";
import UpdateAnimal from './pages/UpdateAnimal/UpdateAnimal';
import DeleteAnimal from "./pages/DeleteAnimal/DeleteAnimal";
import AddAnimal from "./pages/AddAnimal/AddAnimal";
import AddMedicalRecord from "./pages/AddMedicalRecord/AddMedicalRecord";
import ManageAdoptionsAndMedical from "./pages/ManageAdoptionsAndMedical/ManageAdoptionsAndMedical";

function App() {
  const location = useLocation();

  // ✅ Get current logged-in user
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axios.get("/api/auth/me");
      return res.data;
    },
    retry: false,
  });

  const isAdmin = authUser?.status == "admin";

  return (
    <>
      <div className="container">
        <Navbar authUser={authUser} />
        {location.pathname !== "/" && (
          <div className="border-b border-gray-300 w-full"></div>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop-carousel" element={<ShopCarousel />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Auth />} />

          {/* ✅ Example: Admin-only route */}
          {isAdmin && (
            <>
              <Route
                path="/dashboard"
                element={<Dashboard authUser={authUser} />}
              />

              <Route path="/update-animal" element={<UpdateAnimal />} />
              <Route path="/delete-animal" element={<DeleteAnimal />} />
              <Route path="/add-medical-record" element={<AddMedicalRecord />} />
              <Route path="/add-animal" element={<AddAnimal />} />
              <Route path="/manage-adoptions-and-medical" element={<ManageAdoptionsAndMedical />} />
            </>

          )}
        </Routes>

        <Footer />
      </div>
      <Toaster />
    </>
  );
}

export default App;
