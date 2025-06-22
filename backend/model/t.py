import os

model_path = 'D:/Data Engineer/Project/Fake-News/backend/model/ai_model/lstm_model.h5'

# Check if the file exists at the given path
if os.path.exists(model_path):
    print(f"Model file found at: {model_path}")
else:
    print(f"Error: Model file not found at {model_path}")
