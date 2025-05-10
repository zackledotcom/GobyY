def trace_reasoning(prompt):
    return {
        "input": prompt,
        "chain": [
            "parsed command",
            "classified intent",
            "selected tool",
            "executed response"
        ]
    }