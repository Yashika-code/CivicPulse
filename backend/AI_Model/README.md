# AI Model Setup Guide

This folder contains the Python virtual environment and configuration for the AI services used in CivicPulse.

## Important: venv is NOT pushed to GitHub

The `venv/` folder (Python virtual environment) is **not committed to GitHub** because:
- It contains 1000s of binary files (~500MB+)
- It's OS-specific and needs to be recreated locally
- Dependencies are managed by `requirements.txt`

## Setup Instructions

### Option 1: Using GROQ API (Recommended - No Setup Needed)

CivicPulse uses **GROQ API** for AI features (image verification, description generation). This runs on GROQ's servers, so **no local Python setup is required**.

**Setup:**
1. Get a GROQ API key from [console.groq.com](https://console.groq.com)
2. Add to `backend/.env`:
   ```
   GROQ_API_KEY=your-groq-api-key
   GROQ_MODEL=llama-3.3-70b-versatile
   GROQ_VISION_MODEL=llama-3.2-90b-vision-preview
   ```
3. Done! The backend service calls GROQ API directly (no venv needed)

### Option 2: Local Ollama Setup (Optional - For Testing)

If you want to run a local vision model instead of GROQ:

1. **Install Ollama**: https://ollama.ai
2. **Pull the vision model**:
   ```bash
   ollama pull llava
   ```
3. **Start Ollama server**:
   ```bash
   ollama serve
   ```
4. **Add to `backend/.env`**:
   ```
   OLLAMA_URL=http://localhost:11434
   OLLAMA_VISION_MODEL=llava
   ```

## Project Structure

- `backend/services/imageVerification.service.js` — Calls GROQ API for image verification
- `backend/services/complaintAi.service.js` — Orchestrates AI analysis
- `.env` — Configuration (GROQ_API_KEY, OLLAMA_URL, etc.)

## About the venv Folder

The `venv/` folder is:
- Generated when you first run setup (if needed)
- Excluded from GitHub (see `.gitignore`)
- Safe to delete; can be recreated with `pip install -r requirements.txt`

**You do NOT need to manually set up Python** for the current implementation (GROQ API is cloud-based).

## File Structure After Clone

When you clone the repo from GitHub, this folder will contain:
```
AI_Model/
├── .env              ← Configuration file (NOT ignored, you commit it)
├── .gitignore        ← Tells git to ignore venv/
└── (venv/ will be missing - this is normal)
```

**The venv/ is intentionally not included.**

## If You Need to Modify AI Logic

If you're adding local Python scripts or models:

1. Create `requirements.txt`:
   ```bash
   pip freeze > requirements.txt
   ```

2. Create setup script (e.g., `setup.sh` or `setup.py`)

3. **DO commit** to GitHub:
   - ✅ Python source files (`.py`)
   - ✅ `requirements.txt`
   - ✅ `.env.example` or configuration files

4. **DO NOT commit** to GitHub:
   - ❌ `venv/` folder (excluded by `.gitignore`)
   - ❌ `__pycache__/`
   - ❌ `.env` with actual keys (use `.env.example` instead)

## Troubleshooting

**Q: I cloned the repo and AI_Model/ is empty!**  
A: This is normal. The venv/ is not in GitHub. Just use GROQ API (no Python setup needed).

**Q: Can I delete the venv/ folder?**  
A: Yes, it's safe. It will be regenerated if you run setup again (not needed for GROQ API).

**Q: How do I know if AI is working?**  
A: Check backend logs for GROQ API calls. Test by creating a complaint with an image - the AI analysis will process via GROQ.

---

For more details, see the main [README.md](../README.md) and [SETUP.md](../SETUP.md).
