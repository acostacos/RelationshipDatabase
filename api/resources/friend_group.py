from flask_restful import Resource, reqparse
from db import execute_nonquery, execute_query
from helpers.response_helper import return_bad_request
from helpers.query_helper import get_insert_query, get_select_all_query, get_select_one_query, get_update_query

class FriendGroup(Resource):
    tablename = 'friend_groups'
    columns = [
        'friend_group_id',
        'name',
    ]

    def get(self, friend_group_id=None):
        try:
            if friend_group_id is not None:
                return self.get_one(friend_group_id)
            return self.get_all()
        except Exception as e:
            return return_bad_request(e)

    def post(self):
        parser = self.post_parser()
        args = parser.parse_args()

        try:
            new_friend_group = {
                'name': args['name'],
            }

            insert_columns = FriendGroup.columns[1:]
            sql = get_insert_query(FriendGroup.tablename, insert_columns)
            execute_nonquery(sql, new_friend_group)

            return_val = { 'message': 'Successfully created.' }
            return return_val, 201
        except Exception as e:
            return return_bad_request(e)

    def put(self):
        parser = self.put_parser()
        args = parser.parse_args()

        try:
            friend_group_info = {
                'friend_group_id': args['friend_group_id'],
                'name': args['name'],
            }
            self.check_if_exists(friend_group_info['friend_group_id'])
            sql = get_update_query(FriendGroup.tablename, FriendGroup.columns[1:], FriendGroup.columns[0])
            execute_nonquery(sql, friend_group_info)

            return_val = { 'message': 'Successfully updated.' }
            return return_val
        except Exception as e:
            return return_bad_request(e)

    def delete(self):
        parser = self.delete_parser()
        args = parser.parse_args()

        try:
            friend_group_id = args['friend_group_id']
            self.check_if_exists(friend_group_id)

            delete_sql = f"DELETE FROM {FriendGroup.tablename} WHERE friend_group_id = %s"
            execute_nonquery(delete_sql, [friend_group_id])

            return_val = { 'message': 'Successfully deleted.' }
            return return_val
        except Exception as e:
            return return_bad_request(e)

    def get_all(self):
        sql = get_select_all_query(FriendGroup.tablename, FriendGroup.columns)
        results = execute_query(sql)
        return results

    def get_one(self, friend_group_id):
        sql = get_select_one_query(FriendGroup.tablename, FriendGroup.columns, FriendGroup.columns[0])
        results = execute_query(sql, [friend_group_id])
        if (len(results) == 0):
            raise Exception("Friend group with given ID not found.")
        return results[0]

    def check_if_exists(self, friend_group_id):
        check_if_exists_sql = f"SELECT 1 FROM {FriendGroup.tablename} WHERE friend_group_id = %s"
        exists_result = execute_query(check_if_exists_sql, [friend_group_id])
        if (len(exists_result) == 0):
            raise Exception("Friend group with given ID does not exist.")

    def post_parser(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True, help='Name is required.')
        return parser

    def put_parser(self):
        parser = reqparse.RequestParser()
        parser.add_argument('friend_group_id', type=str, required=True, help='Friend group ID is required.')
        parser.add_argument('name', type=str, required=True, help='Name is required.')
        return parser

    def delete_parser(self):
        parser = reqparse.RequestParser()
        parser.add_argument('friend_group_id', type=int, required=True, help='Friend group ID is required.')
        return parser

