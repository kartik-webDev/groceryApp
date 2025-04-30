import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const GroceryProvision = () => {
  const { budget, setBudget, products, cartItems, addToCart, updateCartItems, removeFromCart, getCartAmount, currency } = useAppContext();
  const [remaining, setRemaining] = useState(budget);
  const [newItem, setNewItem] = useState({ name: "", quantity: "", price: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    setRemaining(budget - getCartAmount());
  }, [cartItems, budget]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setNewItem({ ...newItem, name: value });
      setError("");
    } else {
      setError("Item name must contain only alphabets!");
    }
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value > 0) {
      setNewItem({ ...newItem, quantity: value });
      setError("");
    } else {
      setError("Quantity must be a positive number!");
    }
  };

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setNewItem({ ...newItem, price: value });
      setError("");
    } else {
      setError("Price must be a positive number!");
    }
  };

  const addGroceryItem = () => {
    if (!newItem.name || !newItem.quantity || !newItem.price) {
      setError("Please fill all fields correctly!");
      return;
    }

    const newTotal = getCartAmount() + Number(newItem.quantity) * Number(newItem.price);
    if (newTotal > budget) {
      setError("Cannot exceed monthly budget!");
      return;
    }

    addToCart(newItem.name);
    setNewItem({ name: "", quantity: "", price: "" });
    setError("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">🛒 Monthly Grocery Tracker</h1>

      <div className="mb-4">
        <label className="block text-gray-600 font-semibold">Set Monthly Budget (₹):</label>
        <input
          type="number"
          className="border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
        />
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">📌 Grocery List:</h2>
      <div className="bg-gray-100 p-3 rounded-lg">
        {Object.keys(cartItems).length === 0 ? (
          <p className="text-center text-gray-500">No groceries added yet.</p>
        ) : (
          <ul>
            {products.map((product) => {
             

              return (
                <li key={product} className="flex justify-between items-center p-3 bg-white shadow-md rounded-md mb-2">
                  <div>
                    <p className="text-lg font-medium text-gray-600">
                      {product.name} - {cartItems[product]} qty @ {currency}{product.offerPrice} each
                    </p>
                  </div>
                  <div>
                    <input
                      type="number"
                      min="1"
                      value={cartItems[product]}
                      className="border p-2 w-16"
                      onChange={(e) => updateCartItems(product, Number(e.target.value))}
                    />
                    <button className="text-red-500 ml-2" onClick={() => removeFromCart(product)}>
                      <FaTrash />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">➕ Add New Grocery:</h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <div className="flex gap-3 mt-2">
        <input
          type="text"
          className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Item Name"
          value={newItem.name}
          onChange={handleNameChange}
        />
        <input
          type="number"
          className="border p-3 w-24 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Qty"
          value={newItem.quantity}
          onChange={handleQuantityChange}
        />
        <input
          type="number"
          className="border p-3 w-28 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="₹ Price"
          value={newItem.price}
          onChange={handlePriceChange}
        />
        <button
          onClick={addGroceryItem}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-md shadow-md hover:opacity-80 transition duration-200"
        >
          Add
        </button>
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-xl font-semibold text-gray-700">💰 Total Spent: ₹{getCartAmount()}</h2>
        <h2 className={`text-xl font-semibold ${remaining < 0 ? "text-red-500" : "text-green-500"}`}>
          🏦 Remaining Budget: ₹{remaining}
        </h2>
      </div>
    </div>
  );
};

export default GroceryProvision;