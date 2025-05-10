import subprocess

def run_command(cmd):
    try:
        return subprocess.check_output(cmd, shell=True).decode().strip()
    except Exception as e:
        return str(e)