from flask import Flask
from flask_restful import Api
from users import UserController, UsersController

app = Flask(__name__)
api = Api(app)

api.add_resource(UsersController, '/user')
api.add_resource(UserController, '/user/<id>')

if __name__ == '__main__':
    app.run(debug=True)