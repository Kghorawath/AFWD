// src/pages/Courses.js
import React, { useState } from "react";

const Courses = () => {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const courses = [
    {
      id: 1,
      title: "React Basics",
      type: "unpaid",
      description: "Learn the fundamentals of React, components, hooks, and JSX.",
      video: "https://www.youtube.com/embed/dGcsHMXbSOA",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      type: "paid",
      description: "Deep dive into JavaScript, ES6+, closures, and async programming.",
    },
    {
      id: 3,
      title: "Tailwind CSS",
      type: "unpaid",
      description: "Learn how to style websites easily using Tailwind CSS.",
      video: "https://www.youtube.com/embed/dFgzHOX84xQ",
    },
    {
      id: 4,
      title: "Data Structures & Algorithms",
      type: "paid",
      description: "Master DSA concepts for interviews and competitive programming.",
    },
  ];

  const filteredCourses = courses.filter(
    (course) => filter === "all" || course.type === filter
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-20">
      <h1 className="text-4xl font-bold text-center mb-12">Courses</h1>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-12">
        {["all", "paid", "unpaid"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === f
                ? "bg-purple-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition transform hover:scale-105 flex flex-col gap-4"
          >
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Type:{" "}
              <span className={course.type === "paid" ? "text-green-600" : "text-yellow-500"}>
                {course.type.toUpperCase()}
              </span>
            </p>

            {/* Show Video for unpaid courses */}
            {course.type === "unpaid" && course.video && (
              <div className="w-full h-40 md:h-48 overflow-hidden rounded-lg">
                <iframe
                  className="w-full h-full"
                  src={course.video}
                  title={course.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* Description Toggle */}
            <button
              onClick={() => setExpanded(expanded === course.id ? null : course.id)}
              className="text-purple-600 dark:text-purple-400 font-semibold underline"
            >
              {expanded === course.id ? "Hide Description" : "Show Description"}
            </button>

            {expanded === course.id && (
              <p className="text-gray-700 dark:text-gray-300 mt-2">{course.description}</p>
            )}

            {/* Add to Cart Button for Paid Courses */}
            {course.type === "paid" && (
              <button
                onClick={() => {
                  const cart = JSON.parse(localStorage.getItem("cart")) || [];
                  if (!cart.find((c) => c.id === course.id)) cart.push(course);
                  localStorage.setItem("cart", JSON.stringify(cart));
                  alert(`${course.title} added to cart!`);
                }}
                className="mt-auto bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
