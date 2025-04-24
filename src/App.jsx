import React from "react";
import Wallet from "./components/Wallet.jsx";
import Auth from "./components/Auth.jsx";
import Transactions from "./components/Transactions .jsx";
import Footer from "./components/Footer.jsx"
import Navbar from "./components/Navbar.jsx"

const App = ()=> {
  const transactions = [
    { type: "Deposit", amount: 500 },
    { type: "Withdraw", amount: 200 },
  ];

  return (
    <div >
      <Navbar/>
      
      
    </div>
  );
}

export default App;