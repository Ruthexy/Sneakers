import React from "react";
import { Trash2 } from "lucide-react";
import { useCart } from "../src/context/CartContext";

const CartDropdown: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { items, removeItem } = useCart();

  return (
    <div
      className="absolute right-0 top-14 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50"
      role="dialog"
      aria-label="Cart"
    >
      <h3 className="p-4 font-bold border-b">Cart</h3>
      <div className="p-4">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-12">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    className="w-12 h-12 rounded-md"
                    alt=""
                  />
                  <div className="flex-1 text-sm text-gray-600">
                    <p className="truncate">{item.name}</p>
                    <p>
                      ${item.price.toFixed(2)} x {item.qty}{" "}
                      <span className="font-bold text-black">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <button
                    className="p-2 rounded hover:bg-gray-100"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
              onClick={onClose}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
