// src/pages/Cart.js
import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Remove course from cart
  const removeCourse = (id) => {
    const updatedCart = cart.filter((course) => course.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-20">
      <h1 className="text-4xl font-bold text-center mb-12">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300 text-lg">
          Your cart is empty!
        </p>
      ) : (
        <div className="container mx-auto px-4 flex flex-col gap-8">
          {/* Cart Summary */}
          <div className="text-center mb-6 text-xl font-semibold">
            You have {cart.length} {cart.length === 1 ? "course" : "courses"} in your cart
          </div>

          {/* Cart Items */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cart.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col gap-4 hover:shadow-xl transition transform hover:scale-105"
              >
                {/* Video preview for unpaid courses */}
                {course.type === "unpaid" && course.video && (
                  <div className="w-full h-40 overflow-hidden rounded-lg">
                    <iframe
                      className="w-full h-full"
                      src={course.video}
                      title={course.title || "Course Video"}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                {/* Course Title */}
                <h2 className="text-xl font-bold">{course.title || "Untitled Course"}</h2>

                {/* Course Type */}
                <p className="text-gray-700 dark:text-gray-300">
                  Type:{" "}
                  <span
                    className={
                      course.type === "paid"
                        ? "text-green-600"
                        : course.type === "unpaid"
                        ? "text-yellow-500"
                        : "text-gray-500"
                    }
                  >
                    {(course.type || "UNKNOWN").toUpperCase()}
                  </span>
                </p>

                {/* Description */}
                {course.description && (
                  <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
                )}

                {/* Remove Button */}
                <button
                  onClick={() => removeCourse(course.id)}
                  className="mt-auto bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
