from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import uvicorn

app = FastAPI(
    title="CyberSlayers API",
    description="Backend API for CyberSlayers educational platform",
    version="0.1.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Example route
@app.get("/")
async def root():
    return {"message": "Welcome to CyberSlayers API"}

# Example API route
@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

# This allows running the app directly with: python -m uvicorn main:app --reload
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
