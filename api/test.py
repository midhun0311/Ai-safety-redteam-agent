def handler(request):
    if request.method != "POST":
        return {
            "error": "Method not allowed. Use POST."
        }, 405

    data = request.json() or {}
    prompt_text = data.get("text", "")

    return {
        "prompt": prompt_text,
        "response": "Test response working",
        "risk": "LOW"
    }

app = handler
application = handler
