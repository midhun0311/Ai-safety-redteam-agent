import json

def save_log(data):
    try:
        with open("logs.json", "r") as f:
            logs = json.load(f)
    except:
        logs = []

    logs.append(data)

    with open("logs.json", "w") as f:
        json.dump(logs, f, indent=2)