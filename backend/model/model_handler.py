# model/model_handler.py
import tensorflow as tf
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

# Load both models
model_1 = tf.keras.models.load_model('ai-model/model_1.h5')
model_2 = tf.keras.models.load_model('ai-model/model_2.h5')

# Initialize the TF-IDF vectorizer used during model training
tfidf_vectorizer = TfidfVectorizer(max_features=5000)

# Function to predict if the news article is fake or real
def predict_news(article: str, model_choice: int):
    # Feature extraction
    transformed_text = tfidf_vectorizer.transform([article])

    # Predict using the selected model
    if model_choice == 1:
        prediction = model_1.predict(transformed_text)
    elif model_choice == 2:
        prediction = model_2.predict(transformed_text)
    else:
        raise ValueError("Invalid model choice. Choose either 1 or 2.")

    # Return prediction
    return np.argmax(prediction, axis=1)[0]
