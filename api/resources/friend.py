from flask_restful import Resource, reqparse
from db import execute_nonquery, execute_query
from helpers.response_helper import return_bad_request
from helpers.query_helper import (
    get_insert_query_w_id,
    get_select_all_query,
    get_select_one_query,
    get_update_query
)
from helpers.format_helper import format_datetime, format_date

class Friend(Resource):
    tablename = 'friends'
    columns = [
        'friend_id',
        'modify_date',
        'firstname',
        'lastname',
        'birthday',
        'last_interaction',
        'work',
        'significant_other',
        'likes',
        'dislikes',
        'notes',
    ]

    def get(self, friend_id=None):
        parser = self.get_parser()
        args = parser.parse_args()

        try:
            search = args['search']

            if friend_id is not None:
                result = self.get_one(friend_id)
                self.format_date_properties(result)
                return result
            else:
                results = self.get_all(search)
                for result in results:
                    self.format_date_properties(result)
                return results
        except Exception as e:
            return return_bad_request(e)

    def post(self):
        parser = self.post_parser()
        args = parser.parse_args()

        try:
            new_friend = {
                'firstname': args['firstname'],
                'lastname': args['lastname'],
                'birthday': args['birthday'],
                'last_interaction': args['last_interaction'],
                'work': args['work'],
                'significant_other': args['significant_other'],
                'likes': args['likes'],
                'dislikes': args['dislikes'],
                'notes': args['notes'],
            }

            insert_columns = Friend.columns[2:]
            sql = get_insert_query_w_id(Friend.tablename, insert_columns, Friend.columns[0])
            result = execute_query(sql, new_friend)

            return_val = { 'message': 'Successfully created.' } | result[0]
            return return_val, 201
        except Exception as e:
            return return_bad_request(e)

    def put(self):
        parser = self.put_parser()
        args = parser.parse_args()

        try:
            friend_info = {
                'friend_id': args['friend_id'],
                'firstname': args['firstname'],
                'lastname': args['lastname'],
                'birthday': args['birthday'],
                'last_interaction': args['last_interaction'],
                'work': args['work'],
                'significant_other': args['significant_other'],
                'likes': args['likes'],
                'dislikes': args['dislikes'],
                'notes': args['notes'],
            }
            self.check_if_exists(friend_info['friend_id'])
            sql = get_update_query(Friend.tablename, Friend.columns[2:], Friend.columns[0])
            execute_nonquery(sql, friend_info)

            return_val = { 'message': 'Successfully updated.' }
            return return_val
        except Exception as e:
            return return_bad_request(e)


    def delete(self):
        parser = self.delete_parser()
        args = parser.parse_args()

        try:
            friend_id = args['friend_id']
            self.check_if_exists(friend_id)

            delete_sql = f"DELETE FROM {Friend.tablename} WHERE friend_id = %s"
            execute_nonquery(delete_sql, [friend_id])

            return_val = { 'message': 'Successfully deleted.' }
            return return_val
        except Exception as e:
            return return_bad_request(e)

    def get_all(self, search):
        sql = get_select_all_query(Friend.tablename, Friend.columns)
        if search is not None:
            sql += f" WHERE concat_ws(' ', firstname, lastname) LIKE '%{search}%'"
        results = execute_query(sql)
        return results

    def get_one(self, friend_id):
        sql = get_select_one_query(Friend.tablename, Friend.columns, Friend.columns[0])
        results = execute_query(sql, [friend_id])
        if len(results) == 0:
            raise Exception("Friend with given ID not found.")
        return results[0]

    def format_date_properties(self, row):
        row['modify_date'] = format_datetime(row['modify_date'])
        row['birthday'] = format_date(row['birthday'])
        row['last_interaction'] = format_date(row['last_interaction'])

    def check_if_exists(self, friend_id):
        check_if_exists_sql = f"SELECT 1 FROM {Friend.tablename} WHERE friend_id = %s"
        exists_result = execute_query(check_if_exists_sql, [friend_id])
        if len(exists_result) == 0:
            raise Exception("Friend with given ID does not exist.")

    def get_parser(self):
        parser = reqparse.RequestParser()
        parser.add_argument('search', type=str, location='args')
        return parser

    def post_parser(self):
        parser = reqparse.RequestParser()
        parser.add_argument('firstname', type=str, required=True, help='Firstname is required.')
        parser.add_argument('lastname', type=str, required=True, help='Lastname is required.')
        parser.add_argument('birthday')
        parser.add_argument('last_interaction')
        parser.add_argument('work', type=str)
        parser.add_argument('significant_other', type=str)
        parser.add_argument('likes', type=str)
        parser.add_argument('dislikes', type=str)
        parser.add_argument('notes', type=str)
        return parser

    def put_parser(self):
        parser = reqparse.RequestParser()
        parser.add_argument('friend_id', type=str, required=True, help='Friend ID is required.')
        parser.add_argument('firstname', type=str, required=True, help='Firstname is required.')
        parser.add_argument('lastname', type=str, required=True, help='Lastname is required.')
        parser.add_argument('birthday')
        parser.add_argument('last_interaction')
        parser.add_argument('work', type=str)
        parser.add_argument('significant_other', type=str)
        parser.add_argument('likes', type=str)
        parser.add_argument('dislikes', type=str)
        parser.add_argument('notes', type=str)
        return parser

    def delete_parser(self):
        parser = reqparse.RequestParser()
        parser.add_argument('friend_id', type=int, required=True, help='Friend ID is required.')
        return parser
