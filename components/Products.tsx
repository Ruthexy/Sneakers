import React, { useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "../src/context/CartContext";
import Lightbox from "../src/Lightbox";

const images = [
  "/images/image-product-1.jpg",
  "/images/image-product-2.jpg",
  "/images/image-product-3.jpg",
  "/images/image-product-4.jpg",
];

const thumbs = [
  "/images/image-product-1-thumbnail.jpg",
  "/images/image-product-2-thumbnail.jpg",
  "/images/image-product-3-thumbnail.jpg",
  "/images/image-product-4-thumbnail.jpg",
];

const Product: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [qty, setQty] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const { addItem } = useCart();

  const price = 125;

  const addToCart = () => {
    addItem(
      {
        id: "fall-limited-sneakers",
        name: "Fall Limited Edition Sneakers",
        price,
        thumbnail: thumbs[0],
      },
      qty
    );
    setQty(0);
  };

  return (
    <section className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      
      <div>
        <button
          onClick={() => setLightbox(true)}
          className="block w-full rounded-2xl overflow-hidden focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          <img
            src={images[index]}
            alt={`Product image ${index + 1}`}
            className="w-full hover:opacity-90 transition"
          />
        </button>

        <div className="mt-6 grid grid-cols-4 gap-4">
          {thumbs.map((t, i) => (
            <button
              key={t}
              onClick={() => setIndex(i)}
              className={`relative rounded-xl overflow-hidden ring-2 transition ${
                i === index
                  ? "ring-orange-500"
                  : "ring-transparent hover:ring-orange-300"
              }`}
              aria-label={`Show image ${i + 1}`}
            >
              <img src={t} alt={`Thumbnail ${i + 1}`} />
              {i === index && <span className="absolute inset-0 bg-white/60" />}
            </button>
          ))}
        </div>
      </div>

     
      <div className="px-1">
        <p className="uppercase text-orange-500 font-bold tracking-widest text-xs md:text-sm">
          Sneaker Company
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mt-3">
          Fall Limited Edition Sneakers
        </h2>
        <p className="text-gray-600 mt-6">
          These low-profile sneakers are your perfect casual wear companion.
          Featuring a durable rubber outer sole, they’ll withstand everything
          the weather can offer.
        </p>

        <div className="mt-6 flex items-center gap-4">
          <span className="text-3xl font-bold">${price.toFixed(2)}</span>
          <span className="bg-orange-100 text-orange-600 font-bold px-2 py-0.5 rounded">
            50%
          </span>
        </div>
        <p className="text-gray-400 line-through mt-1">$250.00</p>


        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-3 sm:w-48">
            <button
              onClick={() => setQty((q) => Math.max(0, q - 1))}
              className="p-2 rounded hover:opacity-70"
              aria-label="Decrease quantity"
            >
              <Minus />
            </button>
            <span className="font-bold tabular-nums">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="p-2 rounded hover:opacity-70"
              aria-label="Increase quantity"
            >
              <Plus />
            </button>
          </div>

          <button
            onClick={addToCart}
            disabled={qty === 0}
            className="flex-1 inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to cart
          </button>
        </div>
      </div>

      {lightbox && (
        <Lightbox
          images={images}
          thumbs={thumbs}
          index={index}
          setIndex={setIndex}
          onClose={() => setLightbox(false)}
        />
      )}
    </section>
  );
};

export default Product;
