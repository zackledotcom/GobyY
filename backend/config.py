import os
from dotenv import load_dotenv

load_dotenv()

PORT = 8000
DB_PATH = os.getenv("DB_PATH", "./storage/goby_memory.sqlite")
HASH_FILE = '.goby_image.hash'
LOG_FILE = '.goby_violation.log'
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/generate")
DEEPSEEK_MODEL = os.getenv("DEEPSEEK_MODEL", "deepseek-coder:1.3b")
PHI_MODEL = os.getenv("PHI_MODEL", "phi4-mini-reasoning:latest")