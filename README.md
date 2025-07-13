# 📰 Fake News Detection

A full-stack web application that detects whether a news article is real or fake using machine learning. Built with **FastAPI** for the backend and **React** for the frontend.

## 🚀 Tech Stack

- **Frontend**: React
- **Backend**: FastAPI (Python 3.10)
- **Machine Learning**: Scikit-learn, Pandas, NLP tools (e.g., TF-IDF)
- **Other Tools**: Axios, Vite, Tailwind (optional), etc.

## 📦 Features

- Submit a news article or headline to check if it’s fake.
- RESTful API to handle prediction requests.
- Simple and responsive UI for user input.
- Real-time results from a trained ML model.

---

## 🛠️ Getting Started

### 📁 Clone and Setup

```bash
git clone https://github.com/Sushasan11/Fake-News
cd Fake-News

# Backend setup
cd backend
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

# Open a new terminal for frontend setup

# Frontend setup
cd ../frontend
npm install
npm run dev
