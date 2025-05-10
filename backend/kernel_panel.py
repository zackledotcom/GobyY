import subprocess

def monitor_kernel():
    try:
        logs = subprocess.check_output(["log", "show", "--predicate", "eventMessage contains 'kernel'", "--last", "1h"]).decode()
        return logs
    except:
        return "access denied or tool unavailable"