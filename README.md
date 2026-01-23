
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
