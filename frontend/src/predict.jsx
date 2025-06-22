import React, { useState } from "react";
import axios from "./axios";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Search,
  FileText,
  BarChart3,
} from "lucide-react";

export default function FakeNewsDetector() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!title.trim()) return;

    setIsLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await axios.post("/api/predict/", {
        title: title.trim(),
      });

      setResult(response.data);
    } catch (error) {
      console.error("Error analyzing news:", error);
      setError("Failed to analyze. Please try again.");
    }

    setIsLoading(false);
  };

  const getResultStyle = (credibility) => {
    if (credibility === "error") return "border-gray-300 bg-gray-50";
    return credibility === "reliable"
      ? "border-green-200 bg-green-50"
      : "border-red-200 bg-red-50";
  };

  const getResultTextColor = (credibility) => {
    if (credibility === "error") return "text-gray-700";
    return credibility === "reliable" ? "text-green-800" : "text-red-800";
  };

  const getResultIcon = (credibility) => {
    if (credibility === "error")
      return <AlertTriangle className="w-6 h-6 text-gray-600" />;
    return credibility === "reliable" ? (
      <CheckCircle className="w-6 h-6 text-green-600" />
    ) : (
      <AlertTriangle className="w-6 h-6 text-red-600" />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" /> {/* Shield icon here */}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                News Credibility Analyzer
              </h1>
              <p className="text-sm text-gray-600">
                Professional fact-checking and credibility assessment
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Headline Analysis
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Enter a news headline to assess its credibility
            </p>
          </div>

          <div className="p-6">
            {/* Input Section */}
            <div className="mb-6">
              <label
                htmlFor="headline"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                News Headline
              </label>
              <div className="relative">
                <textarea
                  id="headline"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter the news headline you want to analyze for credibility..."
                  className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
                  disabled={isLoading}
                />
                <div className="absolute bottom-3 right-3">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Analyze Button */}
            <div className="mb-6">
              <button
                onClick={handleAnalyze}
                disabled={!title.trim() || isLoading}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-4 h-4" />
                    Analyze Credibility
                  </>
                )}
              </button>
            </div>

            {/* Results Section */}
            {result && (
              <div
                className={`border-2 rounded-lg p-6 ${getResultStyle(
                  result.credibility
                )}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getResultIcon(result.credibility)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3
                        className={`text-xl font-semibold ${getResultTextColor(
                          result.credibility
                        )}`}
                      >
                        {result.credibility === "reliable" && "Likely Credible"}
                        {result.credibility === "suspicious" &&
                          "Potentially Unreliable"}
                        {result.credibility === "error" && "Analysis Error"}
                      </h3>
                      {result.confidence > 0 && (
                        <div className="text-right">
                          <div
                            className={`text-2xl font-bold ${getResultTextColor(
                              result.credibility
                            )}`}
                          >
                            {result.confidence}%
                          </div>
                          <div className="text-xs text-gray-600">
                            Confidence
                          </div>
                        </div>
                      )}
                    </div>

                    {result.message && (
                      <p
                        className={`mb-4 ${getResultTextColor(
                          result.credibility
                        )}`}
                      >
                        {result.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
