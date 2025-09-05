// src/pages/Home.js
import React, { useState } from "react";

// Quiz topics and questions
const quizTopics = {
  React: [
    {
      question: "Which hook is used to manage state in React?",
      options: ["useEffect", "useState", "useReducer", "useContext"],
      answer: "useState",
      explanation: "useState is used for managing local state in functional components.",
    },
    {
      question: "What is JSX?",
      options: ["A templating engine", "A JavaScript extension", "A CSS framework", "A database"],
      answer: "A JavaScript extension",
      explanation: "JSX allows writing HTML inside JavaScript for React components.",
    },
  ],
  JavaScript: [
    {
      question: "Which method converts JSON to JavaScript object?",
      options: ["JSON.stringify", "JSON.parse", "JSON.object", "JSON.convert"],
      answer: "JSON.parse",
      explanation: "JSON.parse converts JSON strings into JavaScript objects.",
    },
    {
      question: "Which keyword declares a variable with block scope?",
      options: ["var", "let", "const", "both let and const"],
      answer: "both let and const",
      explanation: "let and const are block-scoped, var is function-scoped.",
    },
  ],
};

const Home = () => {
  // Signup form
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Quiz states
  const [selectedTopic, setSelectedTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");

  // Doubt section
  const [doubt, setDoubt] = useState("");
  const [doubtsList, setDoubtsList] = useState([]);

  // Signup handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    alert(`Welcome, ${formData.name}!`);
  };

  // Quiz handlers
  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
    setQuestions(quizTopics[e.target.value] || []);
    setCurrentQ(0);
    setSelectedOption("");
    setFeedback("");
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleQuizSubmit = () => {
    if (!selectedOption) return;
    const correctAnswer = questions[currentQ].answer;

    if (selectedOption === correctAnswer) {
      setFeedback("Correct! 🎉");
    } else {
      const explanation =
        questions[currentQ].explanation.length > 100
          ? questions[currentQ].explanation.slice(0, 100) + "..."
          : questions[currentQ].explanation;
      setFeedback(`Incorrect ❌: ${explanation}`);
    }

    // Move to next question after 2 seconds
    setTimeout(() => {
      setCurrentQ(currentQ + 1);
      setSelectedOption("");
      setFeedback("");
    }, 2000);
  };

  // Doubt handlers
  const handleDoubtSubmit = () => {
    if (!doubt) return;
    setDoubtsList([...doubtsList, doubt]);
    setDoubt("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-center py-20">
        <h1 className="text-5xl font-extrabold mb-4 text-gray-100">Welcome to EduStream</h1>
        <p className="text-xl text-gray-200">Learn, Grow, and Achieve your goals!</p>
      </section>

      {/* Features */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-4">Interactive Learning</h3>
            <p>Engage with interactive content and hands-on projects.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-4">Expert Mentors</h3>
            <p>Learn from industry experts and experienced instructors.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-4">Flexible Schedule</h3>
            <p>Study anytime, anywhere at your own pace.</p>
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800 container mx-auto px-4 rounded-lg mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
        <form onSubmit={handleSubmitForm} className="max-w-md mx-auto flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button className="bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition">
            Submit
          </button>
        </form>
      </section>

      {/* Quiz Section */}
      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold mb-4">Take a Quiz</h2>

        {/* Topic Selection */}
        <select
          value={selectedTopic}
          onChange={handleTopicChange}
          className="p-3 rounded border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 mb-6"
        >
          <option value="">-- Select Topic --</option>
          {Object.keys(quizTopics).map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>

        {/* Current Quiz */}
        {questions.length > 0 && currentQ < questions.length && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <p className="text-lg font-semibold mb-4">{questions[currentQ].question}</p>
            <div className="grid gap-4 mb-4">
              {questions[currentQ].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  className={`p-3 rounded border border-gray-400 dark:border-gray-600 w-full text-left transition ${
                    selectedOption === option
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleQuizSubmit}
              className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
            >
              Submit
            </button>
            {feedback && <p className="mt-2 text-gray-900 dark:text-gray-100 font-medium">{feedback}</p>}
          </div>
        )}

        {currentQ >= questions.length && questions.length > 0 && (
          <p className="text-lg font-semibold mt-4">You have completed the quiz! 🎉</p>
        )}
      </section>

      {/* Doubt Section */}
      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold mb-4">Ask a Doubt</h2>
        <textarea
          value={doubt}
          onChange={(e) => setDoubt(e.target.value)}
          placeholder="Type your doubt here..."
          className="w-full p-3 rounded border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 mb-2"
        />
        <button
          onClick={handleDoubtSubmit}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Post Doubt
        </button>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Doubts Posted</h3>
          {doubtsList.length === 0 && <p>No doubts yet.</p>}
          <ul className="list-disc ml-5">
            {doubtsList.map((d, idx) => (
              <li key={idx} className="mb-1">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
