def get_risk(score):
    if score == 0:
        return "LOW"
    elif score == 1:
        return "MEDIUM"
    else:
        return "HIGH"