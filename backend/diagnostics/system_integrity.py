def run_check():
    """
    Perform a system integrity check.
    """
    try:
        # Example: Check disk space
        import shutil
        total, used, free = shutil.disk_usage("/")
        return {
            "total_space": total,
            "used_space": used,
            "free_space": free,
            "status": "healthy" if free / total > 0.1 else "low disk space"
        }
    except Exception as e:
        return {"error": str(e)}