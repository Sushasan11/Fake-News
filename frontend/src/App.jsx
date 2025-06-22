import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Predict from "./predict";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          Fake News Detector
        </h1>
        <Routes>
          <Route path="/" element={<Predict />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
