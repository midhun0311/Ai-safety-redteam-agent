# Ai-safety-redteam-agent

## Local setup

1. Create or activate the Python virtual environment:
   - `python -m venv .venv`
   - `.\.venv\Scripts\Activate.ps1` (PowerShell) or `.\.venv\Scripts\activate.bat` (cmd)
2. Install dependencies:
   - `python -m pip install -r requirements.txt`
3. Run the backend locally:
   - `python -m uvicorn Backend.main:app --host 0.0.0.0 --port 8000`
4. Open the frontend:
   - Serve the `public/` folder from a static server, for example:
     - `python -m http.server 8080 --directory public`
   - Then visit `http://127.0.0.1:8080`

## Vercel deployment

- Static frontend lives in `public/`
- Python serverless endpoint is `api/test.py`
- Vercel automatically serves `public/index.html` at `/`
- The frontend calls the backend at `/api/test`

## Notes

- Keep `frontend/` as source copy if desired, but the deployable app is in `public/`
- The backend check endpoint is `POST /api/test`
