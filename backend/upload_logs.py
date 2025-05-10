def gather_logs():
    try:
        with open(".goby_violation.log", "r") as f:
            return f.read()
    except:
        return "no log"