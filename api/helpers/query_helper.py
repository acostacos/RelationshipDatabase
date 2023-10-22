CSV_DELIMITER = ', '
PARAM_PLACEHOLDER = '<%COLUMN_NAME%>'
PARAM_FORMAT = f'%({PARAM_PLACEHOLDER})s'

def get_insert_query(tablename, columns):
    column_csv = CSV_DELIMITER.join(columns)
    param_csv = CSV_DELIMITER.join([format_param(x) for x in columns])
    return f"INSERT INTO {tablename}({column_csv}) VALUES({param_csv})"

def get_insert_query_w_id(tablename, columns, id_column):
    insert_query = get_insert_query(tablename, columns)
    return f"{insert_query} RETURNING {id_column}"

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

def get_friends_in_friend_group_query(friend_columns, friend_tablename, member_tablename):
    column_csv = CSV_DELIMITER.join([f"f.{x}" for x in friend_columns])
    params = {
        'column_csv': column_csv,
        'friend_table': friend_tablename,
        'member_table': member_tablename,
    }
    return """
           SELECT {column_csv} FROM {friend_table} f
           INNER JOIN {member_table} fgm
           ON f.friend_id = fgm.friend_id
           WHERE fgm.friend_group_id = %s
           """.format(**params)

def get_friends_not_in_friend_group_query(friend_columns, friend_tablename, member_tablename):
    column_csv = CSV_DELIMITER.join([f"f.{x}" for x in friend_columns])
    params = {
        'column_csv': column_csv,
        'friend_table': friend_tablename,
        'member_table': member_tablename,
    }
    return """
           SELECT {column_csv} FROM {friend_table} f
           LEFT JOIN {member_table} fgm
           ON f.friend_id = fgm.friend_id
           WHERE fgm.friend_group_id IS DISTINCT FROM %s
           """.format(**params)

def format_param(column):
    return PARAM_FORMAT.replace(PARAM_PLACEHOLDER, column)

