import React, { useState } from "react";
import {Menu, X, ShoppingCart } from "lucide-react";
import CartDropdown from "./CartDropdown";
import { useCart } from "../src/context/CartContext";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 md:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            sneakers
          </h1>
          <ul className="hidden md:flex gap-8 text-gray-600">
            {["Collections", "Men", "Women", "About", "Contact"].map((t) => (
              <li
                key={t}
                className="cursor-pointer hover:text-black relative after:absolute after:-bottom-6 after:left-0 after:right-0 after:h-1 after:bg-orange-500 after:opacity-0 hover:after:opacity-100 transition"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center gap-6">
          <button
            aria-label="Cart"
            onClick={() => setOpen((o) => !o)}
            className="relative p-1 hover:opacity-70 transition"
          >
            <ShoppingCart className="w-6 h-6" />
            {count > 0 && (
              <span className="absolute -top-1 -right-2 rounded-full bg-orange-500 text-white text-[10px] px-1.5 py-0.5">
                {count}
              </span>
            )}
          </button>

          <img
            src="/images/image-avatar.png"
            alt="User avatar"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-transparent hover:border-orange-500 cursor-pointer"
          />
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          {menuOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-50">
              <ul className="flex flex-col gap-4 p-6 text-gray-700 font-medium">
                <li className="hover:text-black cursor-pointer">Collections</li>
                <li className="hover:text-black cursor-pointer">Men</li>
                <li className="hover:text-black cursor-pointer">Women</li>
                <li className="hover:text-black cursor-pointer">About</li>
                <li className="hover:text-black cursor-pointer">Contact</li>
              </ul>
            </div>
          )}

          {open && <CartDropdown onClose={() => setOpen(false)} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
