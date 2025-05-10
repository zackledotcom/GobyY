import threading
import time
import os

def watch_surveillance_signals(interval=5):
    while True:
        # Simulate signal detection logic
        suspicious = False
        try:
            output = os.popen("lsof -i | grep -Ei 'camera|microphone|zoom|facetime'").read()
            if "zoom" in output.lower() or "camera" in output.lower():
                suspicious = True
        except:
            pass

        if suspicious:
            with open(".goby_violation.log", "a") as log:
                log.write("[ALERT] Possible tap detected\n")
        time.sleep(interval)

def start_daemon():
    thread = threading.Thread(target=watch_surveillance_signals, daemon=True)
    thread.start()