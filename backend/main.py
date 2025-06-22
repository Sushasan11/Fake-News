from fastapi import FastAPI
from routes.predict import router as predict_router

# Initialize FastAPI app
app = FastAPI()

# Include the prediction route
app.include_router(predict_router, prefix="/api", tags=["Prediction"])
