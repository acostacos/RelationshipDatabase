CSV_DELIMITER = ', '
PARAM_PLACEHOLDER = '<%COLUMN_NAME%>'
PARAM_FORMAT = f'%({PARAM_PLACEHOLDER})s'

def get_insert_query(tablename, columns):
    column_csv = CSV_DELIMITER.join(columns)
    param_csv = CSV_DELIMITER.join([format_param(x) for x in columns])
    return f"INSERT INTO {tablename}({column_csv}) VALUES({param_csv})"

def get_select_all_query(tablename, columns):
    column_csv = CSV_DELIMITER.join(columns)
    return f"SELECT {column_csv} FROM {tablename}"

def get_select_one_query(tablename, columns, filter_col):
    select_all_query = get_select_all_query(tablename, columns)
    return f"{select_all_query} WHERE {filter_col} = %s"

def get_update_query(tablename, columns, filter_col):
    set_column_csv = CSV_DELIMITER.join([f"{x}={format_param(x)}" for x in columns])
    filter_clause = f"{filter_col} = {format_param(filter_col)}"
    return f"UPDATE {tablename} SET {set_column_csv} WHERE {filter_clause}"

def format_param(column):
    return PARAM_FORMAT.replace(PARAM_PLACEHOLDER, column)

