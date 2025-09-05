// src/pages/Home.js
import React, { useState } from "react";

const Home = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizFeedback, setQuizFeedback] = useState("");

  // Validation
  const validate = (field, value) => {
    let error = "";
    if (field === "name" && value.trim() === "") error = "Name is required";
    if (field === "email") {
      if (!value) error = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid";
    }
    setErrors({ ...errors, [field]: error });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.name && !errors.email) {
      alert(`Welcome, ${formData.name}!`);
      setFormData({ name: "", email: "" });
    }
  };

  const checkQuiz = () => {
    if (quizAnswer.toLowerCase() === "react") setQuizFeedback("Correct!");
    else setQuizFeedback("Try again!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-gray-900 dark:text-gray-100 py-20 text-center">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-md">Welcome to EduStream</h1>
        <p className="text-xl mb-8 text-gray-800 dark:text-gray-300">Learn, Grow, and Achieve your goals!</p>
      </section>

      {/* Features */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">Our Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Interactive Learning", desc: "Engage with interactive content and hands-on projects." },
            { title: "Expert Mentors", desc: "Learn from industry experts and experienced instructors." },
            { title: "Flexible Schedule", desc: "Study anytime, anywhere at your own pace." }
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 text-center"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Signup Form */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800 container mx-auto px-4 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">Sign Up</h2>
        <form className="max-w-md mx-auto flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded border border-gray-400 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.name && <span className="text-red-500">{errors.name}</span>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded border border-gray-400 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}

          <button
            type="submit"
            className="bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition"
          >
            Submit
          </button>
        </form>
      </section>

      {/* Quiz Section */}
      <section className="py-20 container mx-auto px-4 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">Quick Quiz</h2>
        <div className="max-w-md mx-auto flex flex-col gap-4">
          <p className="text-gray-800 dark:text-gray-300">What library is used for building UI in this app?</p>
          <input
            value={quizAnswer}
            onChange={(e) => setQuizAnswer(e.target.value)}
            placeholder="Type your answer"
            className="p-2 border border-gray-400 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={checkQuiz}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Check Answer
          </button>
          {quizFeedback && <p className="text-gray-900 dark:text-gray-100">{quizFeedback}</p>}
        </div>
      </section>

    </div>
  );
};

export default Home;
