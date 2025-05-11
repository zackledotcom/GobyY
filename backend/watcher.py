import time

def monitor():
    """
    Monitor system activity and log events.
    """
    try:
        while True:
            print("Monitoring system activity...")
            time.sleep(5)  # Simulate monitoring interval
    except KeyboardInterrupt:
        print("Monitoring stopped.")