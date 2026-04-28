def handler(request, response):
    if request.method != "POST":
        response.status_code = 405
        response.headers["Content-Type"] = "application/json"
        response.body = {"error": "Method not allowed. Use POST."}
        return response

    data = request.json() or {}
    prompt_text = data.get("text", "")

    response.status_code = 200
    response.headers["Content-Type"] = "application/json"
    response.body = {
        "prompt": prompt_text,
        "response": "Test response working",
        "risk": "LOW"
    }
    return response
