import tensorflow as tf
import joblib
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

# Load the LSTM model
lstm_model = tf.keras.models.load_model('D:/Data Engineer/Project/Fake-News/backend/model/ai_model/lstm_model.h5')

# Load the fitted TF-IDF vectorizer 
tfidf_vectorizer = joblib.load('D:/Data Engineer/Project/Fake-News/backend/model/ai_model/tfidf_vectorizer.pkl')

# Function to predict if the news article is fake or real using the LSTM model
def predict_news(article: str):
    # Feature extraction: Transform the article using the fitted vectorizer
    transformed_text = tfidf_vectorizer.transform([article])

    # Ensure the input is reshaped correctly, as the model expects 2D data
    transformed_text = np.array(transformed_text.toarray())

    # Predict using the LSTM model
    prediction = lstm_model.predict(transformed_text)

    # Get the confidence (probability) and convert the prediction to 0 (Real) or 1 (Fake)
    confidence = prediction[0][0]
    prediction_label = 1 if confidence >= 0.5 else 0

    # Convert `confidence` to a Python float to make it JSON serializable
    confidence = float(confidence)

    # Return prediction and confidence
    return prediction_label, confidence
