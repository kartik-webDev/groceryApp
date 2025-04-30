import React from "react";
import Wallet from "./components/Wallet.jsx";
import Auth from "./components/Auth.jsx";
import Transactions from "./components/Transactions .jsx";
import Footer from "./components/Footer.jsx"
import Navbar from "./components/Navbar.jsx"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext.jsx";
import Login from "./components/Login.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import ProductCategory from "./pages/ProductCategory.jsx";
import ProductDetails from "./pages/Productdetails.jsx";
import Cart from "./pages/Cart.jsx";
import PayLater from "./pages/PayLater.jsx";
import MonthlyProvision from "./pages/MonthlyProvision.jsx";
const App = ()=> {
  const transactions = [
    { type: "Deposit", amount: 500 },
    { type: "Withdraw", amount: 200 },
  ];

    const {showUserLogin} = useAppContext()
  return (
    <div >
      <Navbar/>

      {showUserLogin ? <Login/> : null}

      <Toaster/>
      
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/products" element={<AllProducts/>}/>
                <Route path="/products/:category" element={<ProductCategory/>}/>
                <Route path="/products/:category/:id" element={<ProductDetails/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/paylater" element={<PayLater/>}/>
                <Route path="/provision" element={<MonthlyProvision />}/>
                

              </Routes>
      </div> 
      <Footer/>
    </div>
  );
}

export default App;