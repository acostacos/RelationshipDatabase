from flask_restful import Resource, reqparse
from db import execute_nonquery, execute_query
from helpers.response_helper import return_bad_request

class FriendGroupMember(Resource):
    def __init__(self):
        self.tablename = 'friend_group_members'
        self.friend_table = 'friends'
        self.friendgroup_table = 'friend_groups'

    def get(self, friend_group_id):
        try:
            sql = f"SELECT friend_id, firstname, lastname FROM {self.tablename}"
            results = execute_query(sql)
            return results
        except Exception as e:
            return return_bad_request(e)

    def post(self):
        try:
            pass
        except Exception as e:
            return return_bad_request(e)

    def delete(self):
        try:
            pass
        except Exception as e:
            return return_bad_request(e)

