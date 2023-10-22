from flask_restful import Resource, reqparse
from db import execute_nonquery, execute_query
from resources.friend import Friend
from helpers.response_helper import return_bad_request
from helpers.query_helper import (
    get_friends_in_friend_group_query,
    get_friends_not_in_friend_group_query
)
from helpers.format_helper import format_datetime

class FriendGroupMember(Resource):
    tablename = 'friend_group_members'

    def get(self, friend_group_id):
        parser = self.get_request_parser()
        args = parser.parse_args()

        try:
            sql = ""
            if args['not_in']:
                sql = get_friends_not_in_friend_group_query(
                    Friend.columns[:4],
                    Friend.tablename,
                    FriendGroupMember.tablename
                )
            else:
                sql = get_friends_in_friend_group_query(
                    Friend.columns[:4],
                    Friend.tablename,
                    FriendGroupMember.tablename
                )
            results = execute_query(sql, [friend_group_id])

            for row in results:
                row['modify_date'] = format_datetime(row['modify_date'])

            return results
        except Exception as e:
            return return_bad_request(e)

    def post(self):
        parser = self.post_request_parser()
        args = parser.parse_args()

        try:
            params = {
                'friend_group_id': args['friend_group_id'],
            }

            error_friend_ids = {}
            sql_insert_values = []
            index = 1
            for friend_id in args['friend_ids']:
                exists_params = params | { 'friend_id': friend_id }
                exists_result = self.check_if_exists(exists_params)
                if len(exists_result) > 0:
                    error_friend_ids[friend_id] = "Friend is already included in friend group."
                    continue

                friend_key = f"friend_id_{index}"
                sql_insert_values.append(f"(%(friend_group_id)s, %({friend_key})s)")
                params[friend_key] = friend_id
                index += 1

            if len(sql_insert_values) == 0:
                raise Exception("All friends have already been added to friend group.")

            sql = f"INSERT INTO {FriendGroupMember.tablename}(friend_group_id, friend_id) VALUES{', '.join(sql_insert_values)}"
            execute_nonquery(sql, params)
            return_val = {
                'message': 'Successfully added to friend group.',
                'error_friend_ids': error_friend_ids
            }
            return return_val
        except Exception as e:
            return return_bad_request(e)

    def delete(self):
        parser = self.delete_request_parser()
        args = parser.parse_args()

        try:
            params = {
                'friend_group_id': args['friend_group_id'],
                'friend_id': args['friend_id'],
            }
            exists_result = self.check_if_exists(params)
            if len(exists_result) == 0:
                raise Exception("Friend has not been added to friend group.")

            sql = f"DELETE FROM {FriendGroupMember.tablename} WHERE friend_group_id=%(friend_group_id)s AND friend_id=%(friend_id)s"
            execute_nonquery(sql, params)

            return_val = { 'message': 'Successfully removed from friend group.' }
            return return_val
        except Exception as e:
            return return_bad_request(e)

    def get_request_parser(self):
        parser = reqparse.RequestParser()
        parser.add_argument('not_in', type=bool, location='args')
        return parser

    def post_request_parser(self):
        parser = reqparse.RequestParser()
        parser.add_argument('friend_group_id', type=int, required=True, help='Friend group ID is required.')
        parser.add_argument('friend_ids', type=int, action='append', required=True, help='Friend IDs are required.')
        return parser

    def delete_request_parser(self):
        parser = reqparse.RequestParser()
        parser.add_argument('friend_group_id', type=int, required=True, help='Friend group ID is required.')
        parser.add_argument('friend_id', type=int, required=True, help='Friend  ID is required.')
        return parser

    def check_if_exists(self, params):
        check_if_exists_sql = f"SELECT 1 FROM {FriendGroupMember.tablename} WHERE friend_group_id = %(friend_group_id)s AND friend_id = %(friend_id)s"
        return execute_query(check_if_exists_sql, params)
