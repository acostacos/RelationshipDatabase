from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from resources.friend import Friend
from resources.friend_group import FriendGroup
from resources.friend_group_member import FriendGroupMember

app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(Friend, '/friend', '/friend/<int:friend_id>')
api.add_resource(FriendGroup, '/group', '/group/<int:friend_group_id>')
api.add_resource(FriendGroupMember, '/group/member', '/group/member/<int:friend_group_id>')

if __name__ == '__main__':
    app.run(debug=True)
