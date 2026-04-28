def get_ai_response(prompt):
    prompt = prompt.lower()

    # ⚡ instant response (no API call)
    if "hack" in prompt or "attack" in prompt:
        return "⚠️ This request may involve unsafe or restricted content."

    elif "security" in prompt or "vulnerability" in prompt:
        return "Security helps protect systems from threats and vulnerabilities."

    elif "hello" in prompt:
        return "Hi! This is a safe AI response."

    else:
        return "This is a normal AI response for testing."