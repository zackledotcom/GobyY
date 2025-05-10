import platform
import shutil

def run_self_check():
    results = {
        "os": platform.system(),
        "python": shutil.which("python3") is not None,
        "sqlite": shutil.which("sqlite3") is not None,
        "hash_file_exists": os.path.exists(".goby_image.hash")
    }
    return results