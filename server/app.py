from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models import *
from schemas import *

class Signup(Resource):
    def post(self):
        pass

class Login(Resource):
    def post(self):
        pass

class Logout(Resource):
    def delete(self):
        pass

class CheckSession(Resource):
    def get(self):
        pass

class Logs(Resource):
    def get(self):
        pass
    def post(self):
        pass

class Log(Resource):
    def get(self, id):
        pass
    def post(self):
        pass
    def patch(self, id):
        pass
    def delete(self, id):
        pass

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Logs, '/logs')
api.add_resource(Log, '/log/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)