import React from "react";
import Navbar from "../components/Navbar";
import Product from "../components/Products";
import { CartProvider } from "./context/CartContext";

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 md:px-8 py-8 md:py-14">
          <Product />
        </main>
      </div>
    </CartProvider>
  );
};

export default App;
