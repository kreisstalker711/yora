"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("yora_cart_items");
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch (e) {
        setCartItems([]);
      }
    }
  }, []);

  const saveCart = (newItems: CartItem[]) => {
    setCartItems(newItems);
    localStorage.setItem("yora_cart_items", JSON.stringify(newItems));
    const totalCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("yora_cart_count", totalCount.toString());
    window.dispatchEvent(new Event("storage"));
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = cartItems
      .map((item) => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(0, item.quantity + delta) };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    saveCart(updated);
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    saveCart(updated);
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    saveCart([]); // clear cart
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] text-[#102316] font-sans antialiased flex flex-col justify-between">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#7AA33C] border-t-transparent animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 999;
  const shippingFee = subtotal > 0 ? (isFreeShipping ? 0 : 99) : 0;
  const total = subtotal + shippingFee;

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#102316] font-sans antialiased flex flex-col justify-between">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 animate-fade-in">
        {checkoutSuccess ? (
          <div className="max-w-md mx-auto text-center space-y-6 bg-white border border-[#102316]/5 p-8 sm:p-12 rounded-3xl shadow-xl">
            <div className="w-16 h-16 bg-[#7AA33C]/10 text-[#7AA33C] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="font-serif text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Thank you for supporting organic farming. Your order has been registered, and our Udumalpet farm unit is preparing your fresh harvest shipment.
            </p>
            <div className="pt-4">
              <a
                href="/shop"
                className="bg-[#102316] hover:bg-[#7AA33C] text-white text-xs font-bold px-8 py-4.5 rounded-full transition-all duration-300 uppercase tracking-widest block text-center"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center space-y-6 max-w-md mx-auto py-12">
            <div className="w-16 h-16 bg-[#1F4D2E]/5 text-slate-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h1 className="font-serif text-3xl font-bold">Your Cart is Empty</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              It looks like you haven't added any products to your cart yet. Explore our cold-pressed organic collections to start your healthy wellness journey.
            </p>
            <div className="pt-4">
              <a
                href="/shop"
                className="bg-[#7AA33C] hover:bg-[#8CB847] text-white text-xs font-bold px-8 py-4.5 rounded-full transition-all duration-300 shadow-lg shadow-[#7AA33C]/20 uppercase tracking-widest block text-center"
              >
                Explore Collection
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-left">Your Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Items List */}
              <div className="lg:col-span-8 space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center gap-6 bg-white border border-[#102316]/5 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow text-center sm:text-left"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 bg-[#F3ECE0]/30 rounded-2xl overflow-hidden flex items-center justify-center p-3 border border-[#102316]/5 shrink-0">
                      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </div>

                    {/* Info */}
                    <div className="flex-grow text-center sm:text-left space-y-2">
                      <h4 className="font-serif text-base font-bold text-[#102316] leading-snug">{item.name}</h4>
                      <p className="text-xs text-[#7AA33C] font-bold">₹{item.price.toFixed(2)} / unit</p>
                    </div>

                    {/* Quantity Selector & Price */}
                    <div className="flex items-center gap-6 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center justify-between border border-[#102316]/10 rounded-xl overflow-hidden h-10 w-28 bg-slate-50/50">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-3 h-full hover:bg-slate-200 text-slate-600 transition font-bold text-sm"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold font-mono">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-3 h-full hover:bg-slate-200 text-slate-600 transition font-bold text-sm"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right font-bold w-20">
                        <p className="text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[10px] text-red-500 hover:text-red-700 font-bold uppercase tracking-wider mt-1 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="lg:col-span-4 bg-white border border-[#102316]/5 p-8 rounded-3xl shadow-lg space-y-6 text-left">
                <h3 className="font-serif text-xl font-bold border-b border-slate-100 pb-4">Order Summary</h3>

                <div className="space-y-3 text-xs sm:text-sm text-slate-600 font-medium">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#102316] font-bold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span className="text-[#102316] font-bold">
                      {shippingFee === 0 ? <span className="text-[#7AA33C]">Free</span> : `₹${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                  {!isFreeShipping && (
                    <p className="text-[10px] text-slate-400 font-normal leading-normal italic">
                      Add ₹{(999 - subtotal).toFixed(2)} more for Free Shipping!
                    </p>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-between items-baseline">
                  <span className="font-serif text-base font-bold">Total Amount</span>
                  <span className="text-2xl font-bold text-[#102316]">₹{total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#7AA33C] hover:bg-[#8CB847] text-white text-xs font-bold py-4.5 rounded-xl transition duration-300 shadow-md shadow-[#7AA33C]/10 uppercase tracking-widest text-center"
                >
                  Buy Now (Checkout)
                </button>

                <p className="text-[9px] text-slate-400 font-normal text-center italic">
                  * Local taxes calculated at check-out. Secure connection.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
