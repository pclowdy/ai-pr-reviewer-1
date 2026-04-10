import os
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

from src.github_client import GitHubClient
from src.ai_engine import AIEngine
from src.analyzer import ReviewAnalyzer

load_dotenv()

app = FastAPI(title="AI PR Review API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ReviewRequest(BaseModel):
    pr_url: str

@app.post("/api/review")
async def review_pr(request: ReviewRequest):
    try:
        # 1. Fetch
        gh_client = GitHubClient(token=os.getenv("GITHUB_TOKEN"))
        diff_text = gh_client.fetch_diff_from_url(request.pr_url)
        
        # 2. Analyze
        ai = AIEngine(api_key=os.getenv("GEMINI_API_KEY"))
        raw_review = ai.generate_review(diff_text)
        
        # 3. Parse
        analyzer = ReviewAnalyzer()
        structured_review = analyzer.parse_ai_response(raw_review)
        
        return {
            "status": "success",
            "data": structured_review
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Mount static files to serve the frontend if it's built
if os.path.isdir("frontend/dist"):
    app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="static")
else:
    @app.get("/")
    async def root():
        return {"message": "Frontend not built yet. Run 'npm run build' in the frontend directory."}
