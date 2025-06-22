from fastapi import APIRouter
from model.model_handler import predict_news
from pydantic import BaseModel
from fastapi.responses import JSONResponse

router = APIRouter()

# Pydantic model for receiving news data
class NewsArticle(BaseModel):
    title: str  

# Prediction endpoint
@router.post("/predict/")
async def predict_article(news: NewsArticle):
    try:
        # Use only the title for prediction
        article = news.title  

        # Make prediction using the LSTM model
        prediction, confidence = predict_news(article)  
        
        result = {
            "prediction": "Real" if prediction == 0 else "Fake",  
            "confidence": confidence  
        }

        return JSONResponse(content=result)

    except Exception as e:
        return JSONResponse(status_code=500, content={"message": str(e)})
