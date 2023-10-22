import os
from psycopg2 import connect
from psycopg2.extras import RealDictCursor

ENV_VAR_KEY = "RELATIONDB_CONNSTRING"

def establish_connection():
    if ENV_VAR_KEY not in os.environ:
        raise Exception("Connection string not found in environment variables")

    conn_string = os.environ[ENV_VAR_KEY]
    return connect(conn_string)

def execute_nonquery(sql, params=None):
    try:
        with establish_connection() as conn:
            with conn.cursor() as cur:
                if params is None:
                    cur.execute(sql)
                else:
                    cur.execute(sql, params)
    except Exception as e:
        exception_msg = getattr(e, 'message', repr(e))
        print(f"Error executing SQL statement: {exception_msg}")
        raise Exception(exception_msg) from e

def execute_query(sql, params=None):
    try:
        with establish_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                if params is None:
                    cur.execute(sql)
                else:
                    cur.execute(sql, params)
                return cur.fetchall()
    except Exception as e:
        exception_msg = getattr(e, 'message', repr(e))
        print(f"Error executing SQL statement: {exception_msg}")
        raise Exception(exception_msg) from e
