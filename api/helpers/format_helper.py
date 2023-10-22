def format_datetime(datetime):
    if datetime is None:
        return datetime
    return datetime.strftime("%Y-%m-%d %I:%M %p")

def format_date(date):
    if date is None:
        return date
    return date.strftime("%Y-%m-%d")
