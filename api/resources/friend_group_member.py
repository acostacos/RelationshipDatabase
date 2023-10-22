from flask_restful import Resource, reqparse
from db import execute_nonquery, execute_query
from resources.friend import Friend
from helpers.response_helper import return_bad_request
from helpers.query_helper import get_friends_in_friend_group_query
from helpers.format_helper import format_datetime

class FriendGroupMember(Resource):
    tablename = 'friend_group_members'

    def get(self, friend_group_id):
        try:
            sql = get_friends_in_friend_group_query(
                Friend.columns,
                Friend.tablename,
                FriendGroupMember.tablename
            )
            results = execute_query(sql, [friend_group_id])

            for row in results:
                if row['modify_date'] is not None:
                    row['modify_date'] = format_datetime(row['modify_date'])

            return results
        except Exception as e:
            return return_bad_request(e)

    def post(self):
        parser = self.request_parser()
        args = parser.parse_args()

        try:
            params = self.get_params(args)
            exists_result = self.check_if_exists(params)
            if len(exists_result) > 0:
                raise Exception("Friend is already included in friend group.")

            sql = f"INSERT INTO {FriendGroupMember.tablename}(friend_group_id, friend_id) VALUES(%(friend_group_id)s, %(friend_id)s)"
            execute_nonquery(sql, params)

            return_val = { 'message': 'Successfully added to friend group.' }
            return return_val
        except Exception as e:
            return return_bad_request(e)

    def delete(self):
        parser = self.request_parser()
        args = parser.parse_args()

        try:
            params = self.get_params(args)
            exists_result = self.check_if_exists(params)
            if len(exists_result) == 0:
                raise Exception("Friend has not been added to friend group.")

            sql = f"DELETE FROM {FriendGroupMember.tablename} WHERE friend_group_id=%(friend_group_id)s AND friend_id=%(friend_id)s"
            execute_nonquery(sql, params)

            return_val = { 'message': 'Successfully removed from friend group.' }
            return return_val
        except Exception as e:
            return return_bad_request(e)

    def request_parser(self):
        parser = reqparse.RequestParser()
        parser.add_argument('friend_group_id', type=int, required=True, help='Friend group ID is required.')
        parser.add_argument('friend_id', type=int, required=True, help='Friend  ID is required.')
        return parser

    def get_params(self, args):
        return {
            'friend_group_id': args['friend_group_id'],
            'friend_id': args['friend_id'],
        }

    def check_if_exists(self, params):
        check_if_exists_sql = f"SELECT 1 FROM {FriendGroupMember.tablename} WHERE friend_group_id = %(friend_group_id)s AND friend_id = %(friend_id)s"
        return execute_query(check_if_exists_sql, params)
