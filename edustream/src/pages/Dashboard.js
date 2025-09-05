// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);

  // Load courses from localStorage (cart) with progress
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCourses = storedCourses.map((course) => ({
      ...course,
      progress: course.progress || Math.floor(Math.random() * 101), // demo: random progress
      thumbnail: course.thumbnail || "https://via.placeholder.com/300x150?text=Course", // placeholder if missing
    }));
    setCourses(updatedCourses);
  }, []);

  // Pie chart data
  const completedCourses = courses.filter((c) => c.progress === 100).length;
  const inProgressCourses = courses.length - completedCourses;
  const chartData = [
    { name: "Completed", value: completedCourses },
    { name: "In Progress", value: inProgressCourses },
  ];

  const COLORS = ["#00C49F", "#FFBB28"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Student Dashboard</h1>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-around gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center flex-1">
          <h2 className="text-2xl font-semibold mb-2">Total Courses</h2>
          <p className="text-xl">{courses.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center flex-1">
          <h2 className="text-2xl font-semibold mb-2">Completed</h2>
          <p className="text-xl">{completedCourses}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center flex-1">
          <h2 className="text-2xl font-semibold mb-2">In Progress</h2>
          <p className="text-xl">{inProgressCourses}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="container mx-auto px-4 mb-12 flex justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full md:w-1/2">
          <h2 className="text-xl font-semibold text-center mb-4">Course Completion</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Course Progress Cards */}
      <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-xl transition transform hover:scale-105"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{course.title || "Untitled Course"}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
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

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
              <div
                className={`h-4 rounded-full ${
                  course.progress === 100
                    ? "bg-green-500"
                    : course.progress >= 50
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Progress: {course.progress}%
            </p>

            {course.progress < 100 ? (
              <button className="mt-3 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">
                Continue Course
              </button>
            ) : (
              <p className="mt-3 text-green-500 font-semibold">Course Completed! ✅</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
