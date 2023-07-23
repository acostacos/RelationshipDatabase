def return_bad_request(exception):
    error = getattr(exception, 'message', str(exception))
    return { 'error': error }, 400
