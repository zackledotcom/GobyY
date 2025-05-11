import secrets

def generate_token():
    """
    Generate a secure random token for authentication.
    """
    return secrets.token_urlsafe(32)