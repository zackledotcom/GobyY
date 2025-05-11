import logging
from logging.handlers import RotatingFileHandler

LOG_FILE = "goby_superagent.log"

# Configure log rotation
handler = RotatingFileHandler(LOG_FILE, maxBytes=5 * 1024 * 1024, backupCount=3)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[handler]
)

def log_message(message):
    logging.info(message)