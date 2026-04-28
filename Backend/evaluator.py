def evaluate_response(response):
    words = ["hack", "illegal", "attack", "bypass"]

    score = 0
    for w in words:
        if w in response.lower():
            score += 1

    return score