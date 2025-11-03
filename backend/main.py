from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import firebase_admin
from firebase_admin import credentials, firestore
import uvicorn
from datetime import datetime
import logging
import hashlib
import uuid

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Firebase with your service account
try:
    if not firebase_admin._apps:
        cred = credentials.Certificate("cyberslayers-service-account.json")
        firebase_admin.initialize_app(cred)
    
    db = firestore.client()
    logger.info("Firebase initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize Firebase: {e}")
    raise

app = FastAPI(
    title="CyberSlayers API",
    description="Backend API for CyberSlayers",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper function to hash passwords
def hash_password(password: str) -> str:
    """Simple password hashing"""
    return hashlib.sha256(password.encode()).hexdigest()

# Pydantic Models
class UserSignUp(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    uid: str
    email: str
    current_game: str
    overall_game_progress: int
    games: dict
    best_performed_game: str
    worst_performed_game: str
    created_at: datetime

# Routes
@app.get("/")
async def root():
    return {"message": "CyberSlayers API is running! 🛡️"}

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "firestore": "connected",
        "timestamp": datetime.now()
    }

@app.post("/api/auth/signup", response_model=UserResponse)
async def sign_up_user(user_data: UserSignUp):
    """
    Sign up a new user - store directly in Firestore
    """
    try:
        # Check if user already exists
        users_ref = db.collection('users')
        existing_users = users_ref.where('email', '==', user_data.email).stream()
        
        if any(existing_users):
            raise HTTPException(
                status_code=400,
                detail="Email already exists"
            )
        
        # Generate a unique user ID
        user_id = str(uuid.uuid4())
        
        # Create user profile with your schema
        user_profile = {
            "uid": user_id,
            "email": user_data.email,
            "password": hash_password(user_data.password),  # Store hashed password
            "current_game": "",
            "overall_game_progress": 0,
            "games": {
                "game1_score": 0,
                "game2_score": 0,
                "game3_score": 0,
                "game4_score": 0
            },
            "best_performed_game": "",
            "worst_performed_game": "",
            "created_at": datetime.now(),
            "last_active": datetime.now()
        }
        
        # Store in Firestore 'users' collection
        db.collection('users').document(user_id).set(user_profile)
        
        logger.info(f"User created successfully: {user_id} with email: {user_data.email}")
        
        # Return user data (without password)
        response_data = user_profile.copy()
        del response_data['password']  # Don't return password
        return UserResponse(**response_data)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Sign up error: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Sign up failed: {str(e)}"
        )

@app.post("/api/auth/login")
async def login_user(user_data: UserSignUp):
    """
    Login a user - check if email/password exists in Firestore
    """
    try:
        # Find user by email
        users_ref = db.collection('users')
        users = users_ref.where('email', '==', user_data.email).stream()
        
        user_doc = None
        for user in users:
            user_doc = user
            break
        
        if not user_doc:
            raise HTTPException(
                status_code=400,
                detail="Invalid email or password"
            )
        
        user_data_dict = user_doc.to_dict()
        
        # Check password
        if user_data_dict.get('password') != hash_password(user_data.password):
            raise HTTPException(
                status_code=400,
                detail="Invalid email or password"
            )
        
        # Update last_active
        db.collection('users').document(user_doc.id).update({
            'last_active': datetime.now()
        })
        
        logger.info(f"User logged in successfully: {user_doc.id}")
        
        # Return user data (without password)
        response_data = user_data_dict.copy()
        del response_data['password']  # Don't return password
        response_data['uid'] = user_doc.id
        
        return {
            "message": "Login successful",
            "user": UserResponse(**response_data)
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(
            status_code=500,
            detail="Login failed"
        )

if __name__ == "__main__":
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True
    )