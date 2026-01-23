# ===============================================
# FastAPI + Cosmos DB + OpenAI Project Setup Script (Poetry)
# ===============================================

Write-Host "Setting up FastAPI project with Poetry..." -ForegroundColor Green

# --- Check for Poetry ---
Write-Host "`nChecking for Poetry..." -ForegroundColor Yellow
try {
    $poetryVersion = poetry --version 2>$null
    Write-Host "Poetry found: $poetryVersion" -ForegroundColor Green
} catch {
    Write-Host "Poetry not found. Please install Poetry first:" -ForegroundColor Red
    Write-Host "Run: (Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -" -ForegroundColor Cyan
    exit 1
}

# --- Create directories ---
Write-Host "`nCreating directories..." -ForegroundColor Yellow
$directories = @(
    "app/api/v1/endpoints",
    "app/api/dependencies",
    "app/core",
    "app/middleware",
    "app/models",
    "app/repositories",
    "app/schemas",
    "app/services",
    "app/utils",
    "tests/api",
    "tests/services",
    "scripts"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

# --- Create __init__.py files ---
Write-Host "Creating __init__.py files..." -ForegroundColor Yellow
$initFiles = @(
    "app/__init__.py",
    "app/api/__init__.py",
    "app/api/v1/__init__.py",
    "app/api/v1/endpoints/__init__.py",
    "app/core/__init__.py",
    "app/middleware/__init__.py",
    "app/models/__init__.py",
    "app/repositories/__init__.py",
    "app/schemas/__init__.py",
    "app/services/__init__.py",
    "app/utils/__init__.py",
    "tests/__init__.py"
)

foreach ($file in $initFiles) {
    New-Item -ItemType File -Force -Path $file | Out-Null
}

# --- Create base files ---
Write-Host "Creating main files..." -ForegroundColor Yellow
$mainFiles = @(
    ".env.example",
    ".gitignore",
    "app/main.py",
    "app/core/config.py",
    "app/core/database.py",
    "app/models/user.py",
    "app/schemas/user.py",
    "app/api/v1/router.py",
    "app/api/v1/endpoints/users.py",
    "app/services/openai_service.py",
    "app/utils/logger.py"
)

foreach ($file in $mainFiles) {
    New-Item -ItemType File -Force -Path $file | Out-Null
}

# --- Create pyproject.toml ---
Write-Host "Creating pyproject.toml..." -ForegroundColor Yellow
$pyprojectContent = @'
[tool.poetry]
name = "smrtcv-backend"
version = "0.1.0"
description = "smrtcv - AI-driven Resume Generator. FastAPI backend using Cosmos DB and OpenAI."
authors = ["Your Name <your.email@example.com>"]
package-mode = false

[tool.poetry.dependencies]
python = "^3.11"
fastapi = "^0.115.0"
uvicorn = { extras = ["standard"], version = "^0.30.0" }
azure-cosmos = "^4.6.0"
openai = "^1.10.0"
httpx = "^0.27.0"
python-dotenv = "^1.0.1"
pydantic = "^2.6.0"
pydantic-settings = "^2.2.1"
loguru = "^0.7.2"
python-multipart = "^0.0.6"

[tool.poetry.group.dev.dependencies]
pytest = "^7.4.4"
pytest-asyncio = "^0.23.3"
pytest-cov = "^4.1.0"
black = "^24.3.0"
isort = "^5.13.2"
mypy = "^1.9.0"
ruff = "^0.2.0"
pre-commit = "^3.7.0"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
'@
Set-Content -Path "pyproject.toml" -Value $pyprojectContent

# --- Create .gitignore ---
Write-Host "Creating .gitignore..." -ForegroundColor Yellow
$gitignoreContent = @'
__pycache__/
*.py[cod]
*$py.class
.env
.venv/
.env.local
.vscode/
.idea/
*.log
dist/
build/
poetry.lock
.pytest_cache/
.coverage
htmlcov/
.DS_Store
Thumbs.db
'@
Set-Content -Path ".gitignore" -Value $gitignoreContent

# --- Create .env.example ---
Write-Host "Creating .env.example..." -ForegroundColor Yellow
$envExampleContent = @'
# Application
APP_NAME=smrtcv-backend
APP_VERSION=0.1.0
DEBUG=True
API_V1_PREFIX=/api/v1

# Cosmos DB
COSMOS_DB_URL=https://your-account.documents.azure.com:443/
COSMOS_DB_KEY=your-primary-key
COSMOS_DB_NAME=smrtcv_db
COSMOS_DB_CONTAINER=users

# OpenAI
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4o-mini

# Security
SECRET_KEY=change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
BACKEND_CORS_ORIGINS=["http://localhost:3000","http://localhost:8000"]
'@
Set-Content -Path ".env.example" -Value $envExampleContent

# Copy .env if missing
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "Created .env from template" -ForegroundColor Yellow
}


# --- Create main.py ---
$mainPyContent = @'
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
'@

$mainPyPath = "app/main.py"
New-Item -Path $mainPyPath -Force -ItemType File -Value $mainPyContent | Out-Null
Write-Host "Created app/main.py with FastAPI starter code" -ForegroundColor Yellow


# --- Create README.md ---

try {
    if (Test-Path "README.md") {
        Write-Host "README.md already exists. Skipping creation." -ForegroundColor Yellow
    }else {
        Write-Host "Creating README.md..." -ForegroundColor Yellow
        $readmeMdContent = @'

#  FastAPI Backend Setup with Poetry, Cosmos DB, and OpenAI

This project sets up a **FastAPI backend** using **Poetry** for dependency management, designed for scalability and production-readiness.  
It integrates **Azure Cosmos DB** (NoSQL) and **OpenAI API** for AI-driven functionalities.

## Tech Stack
- FastAPI (Python 3.11)
- Azure Cosmos DB (NoSQL)
- OpenAI API (LLM)
- Poetry for dependency management
- Loguru for structured logging

---

## Prerequisites

Before running the setup script, ensure you have the following installed:

1. **Python 3.11+**  
   Download from [python.org/downloads](https://www.python.org/downloads/)

   To check:
   ```bash
   python --version
   ```

2. **Poetry (for Python dependency management) -- If not installed, run:**
```bash
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -
```

## Setup

1. Open PowerShell in your desired project folder.

2. Make sure that you already have the and smrtcv.ps1 files in your project directory (if not, copy it to your folder).

3. Run the setup script to generate the FastAPI project structure and configuration by typing the file name in the terminal:
```bash
.\smrtcv.ps1
```

4. Install dependencies (if not auto-installed):
```bash
poetry install
```

3. Update `.env` with your configuration (if needed):

4. Start the development server:
```bash
poetry run uvicorn app.main:app --reload
```

5. Access your API at http://localhost:8000
Swagger Docs: http://localhost:8000/docs

## Development

- Run tests: `poetry run pytest`
- Format code: `poetry run black .`
- Sort imports: `poetry run isort .`
- Type check: `poetry run mypy app`
- Lint: `poetry run ruff check .`
'@

        Set-Content -Path "README.md" -Value $readmeMdContent
        Write-Host "Created README.md with FastAPI amd poetry starter setup instructions" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Error creating README.md: $_" -ForegroundColor Red
}

# Optional (recommended): ensure UTF-8 output
chcp 65001 > $null
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# Emoji surrogate pair for 🖕 (U+1F595)
$emoji = [char]0xD83D + [char]0xDD95

Write-Host "`nNow read the README.md for next steps!" -ForegroundColor Green
Write-Host "`nSetup complete! Tanginanyo $emoji`n`n" -ForegroundColor Green

