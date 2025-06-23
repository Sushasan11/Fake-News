from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  
from routes.predict import router as predict_router

# Initialize FastAPI app
app = FastAPI()


# Add CORSMiddleware to allow the listed origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Include the prediction route
app.include_router(predict_router, prefix="/api", tags=["Prediction"])
