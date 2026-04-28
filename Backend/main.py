from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# create app
app = FastAPI()

# enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# request model
class Prompt(BaseModel):
    text: str

# test API
@app.post("/test")
def test_prompt(prompt: Prompt):
    return {
        "prompt": prompt.text,
        "response": "Test response working",
        "risk": "LOW"
    }

# home route
@app.get("/")
def home():
    return {"message": "Backend running"}