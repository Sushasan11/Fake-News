# routes/predict.py
from fastapi import APIRouter
from model.model_handler import predict_news
from pydantic import BaseModel
from fastapi.responses import JSONResponse

router = APIRouter()

# Pydantic model for receiving news data
class NewsArticle(BaseModel):
    text: str
    model_choice: int

# Prediction endpoint
@router.post("/predict/")
async def predict_article(news: NewsArticle):
    try:
        # Make prediction using the selected model
        prediction = predict_news(news.text, news.model_choice)
        result = {"prediction": "Real" if prediction == 1 else "Fake"}
        return JSONResponse(content=result)
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": str(e)})
