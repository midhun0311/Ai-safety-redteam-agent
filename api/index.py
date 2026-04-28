from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Prompt(BaseModel):
    text: str

@app.post("/test")
def test_prompt(prompt: Prompt):
    return {
        "prompt": prompt.text,
        "response": "Test response working",
        "risk": "LOW"
    }

@app.get("/")
def home():
    return {"message": "Backend running"}
