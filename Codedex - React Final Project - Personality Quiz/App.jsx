import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Question from "./components/Question";
import Results from "./components/Results";
import UserForm from "./components/UserForm";
import { UserProvider } from "./components/UserContext.jsx";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [element, setElement] = useState("");
  const [dogImage, setDogImage] = useState(null);

  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Purple 💜", "Pink 🩷", "White 🤍", "Yellow 💛"],
    },
    {
      question: "What is your favorite food?",
      options: ["Dessert 🍨", "Seafood 🦞", "Burger 🍔", "Buldak Ramen 🍜"],
    },
    {
      question: "Which animal do you prefer?",
      options: ["Panda 🐼", "Whale 🐋", "Penguin 🐧", "Lion 🦁"],
    },
    {
      question: "What is your favorite hobby?",
      options: ["Crocheting 🧶", "Reading 📖", "Gaming 🎮", "Traveling ✈️"],
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ELEMENT_MAP = {
    "Pink 🩷": "Fire",
    "Purple 💜": "Water",
    "White 🤍": "Earth",
    "Yellow 💛": "Air",
    "Dessert 🍨": "Air",
    "Seafood 🦞": "Water",
    "Burger 🍔": "Earth",
    "Buldak Ramen 🍜": "Fire",
    "Panda 🐼": "Earth",
    "Whale 🐋": "Water",
    "Penguin 🐧": "Air",
    "Lion 🦁": "Fire",
    "Crocheting 🧶": "Earth",
    "Reading 📖": "Water",
    "Gaming 🎮": "Fire",
    "Traveling ✈️": "Air",
  };

  const KEYWORDS = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  // Handle quiz answer
  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  // Determine dominant element
  useEffect(() => {
    if (currentQuestionIndex === questions.length && answers.length > 0) {
      const counts = {};
      answers.forEach((answer) => {
        const el = ELEMENT_MAP[answer];
        counts[el] = (counts[el] || 0) + 1;
      });
      const selectedElement = Object.keys(counts).reduce((a, b) =>
        counts[a] > counts[b] ? a : b
      );
      setElement(selectedElement);
      fetchDogImage();
    }
  }, [currentQuestionIndex, answers, questions.length, ELEMENT_MAP]);

  // Fetch random dog image
  async function fetchDogImage() {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      console.error("Failed to fetch dog image:", error);
    }
  }

  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route
          path="/quiz"
          element={
            currentQuestionIndex < questions.length ? (
              <Question
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                onAnswer={handleAnswer}
              />
            ) : (
              <Results element={element} dogImage={dogImage} />
            )
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;
