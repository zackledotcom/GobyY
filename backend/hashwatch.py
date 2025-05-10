import hashlib
import os

def compute_file_hash(path):
    hasher = hashlib.sha256()
    with open(path, 'rb') as f:
        buf = f.read()
        hasher.update(buf)
    return hasher.hexdigest()

def check_integrity(target=".goby_image.hash", compare_file="main.py"):
    if not os.path.exists(target):
        return "no baseline"
    current = compute_file_hash(compare_file)
    with open(target, 'r') as ref:
        baseline = ref.read().strip()
    return "pass" if current == baseline else "FAIL"