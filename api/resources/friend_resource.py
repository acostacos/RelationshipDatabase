from flask_restful import Resource, reqparse
from db import execute_nonquery, execute_query
from helpers.response_helper import return_bad_request

class FriendResource(Resource):
    def __init__(self):
        self.tablename = 'friends'

    def get(self, friend_id=None):
        try:
            if friend_id is not None:
                return self.get_one(friend_id)
            return self.get_all()
        except Exception as e:
            return return_bad_request(e)

    def post(self):
        parser = self.post_parser()
        args = parser.parse_args()

        try:
            new_friend = {
                'firstname': args['firstname'],
                'lastname': args['lastname'],
            }

            sql = f"INSERT INTO {self.tablename}(firstname, lastname) VALUES(%(firstname)s, %(lastname)s)"
            execute_nonquery(sql, new_friend)

            return_val = { 'message': 'Successfully created.' }
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
            }
            self.check_if_exists(friend_info['friend_id'])

            sql = f"UPDATE {self.tablename} SET firstname=%(firstname)s, lastname=%(lastname)s WHERE friend_id = %(friend_id)s"
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

            delete_sql = f"DELETE FROM {self.tablename} WHERE friend_id = %s"
            execute_nonquery(delete_sql, [friend_id])

            return_val = { 'message': 'Successfully deleted.' }
            return return_val
        except Exception as e:
            return return_bad_request(e)

    def get_all(self):
        sql = f"SELECT friend_id, firstname, lastname FROM {self.tablename}"
        results = execute_query(sql)
        return results

    def get_one(self, friend_id):
        sql = f"SELECT friend_id, firstname, lastname FROM {self.tablename} WHERE friend_id = %s"
        results = execute_query(sql, [friend_id])
        return results[0]

    def post_parser(self):
        parser = reqparse.RequestParser()
        parser.add_argument('firstname', type=str, required=True, help='Firstname is required.')
        parser.add_argument('lastname', type=str, required=True, help='Lastname is required.')
        return parser

    def put_parser(self):
        parser = reqparse.RequestParser()
        parser.add_argument('friend_id', type=str, required=True, help='Friend ID is required.')
        parser.add_argument('firstname', type=str, required=True, help='Firstname is required.')
        parser.add_argument('lastname', type=str, required=True, help='Lastname is required.')
        return parser

    def delete_parser(self):
        parser = reqparse.RequestParser()
        parser.add_argument('friend_id', type=int, required=True, help='Friend ID is required.')
        return parser

    def check_if_exists(self, friend_id):
        check_if_exists_sql = f"SELECT 1 FROM {self.tablename} WHERE friend_id = %s"
        exists_result = execute_query(check_if_exists_sql, [friend_id])
        if (len(exists_result) == 0):
            raise Exception("Friend with given ID does not exist.")

