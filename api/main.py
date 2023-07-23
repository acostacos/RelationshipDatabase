from flask import Flask
from flask_restful import Api
from resources.friend_resource import FriendResource

app = Flask(__name__)
api = Api(app)

api.add_resource(FriendResource, '/friend', '/friend/<int:friend_id>');

if __name__ == '__main__':
    app.run(debug=True)
