from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models import User, ReadingLog, Book
from schemas import UserSchema, ReadingLogSchema, BookSchema

class Signup(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        password_confirmation = data.get("password_confirmation")

        if not username or not password:
            return {"errors": "Username and password required"}, 422
        if password != password_confirmation:
            return {'error': 'Passwords do not match.'}, 400
        
        user = User(username=username)
        user.password_hash = password
        
        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
        except IntegrityError:
            db.session.rollback()
            return {'errors': ["Username must be unique."]}, 422
        except ValueError as e:
            db.session.rollback()
            return {'errors': [str(e)]}, 422
        return UserSchema().dump(user), 201

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        if not username or not password:
            return {'error': 'Username and password required.'}, 401
        
        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return UserSchema().dump(user), 200
        else:
            return {'error': 'Invalid username or password.'}, 401

class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None
            return {}, 204
        else:
            return {"error": "User is already logged out" }, 401

class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return UserSchema().dump(user), 200
        else:
            return {"error": "User is not logged in"}, 401

class Logs(Resource):
    def get(self):
        user_id = session.get('user_id')
        if not user_id:
            return {'error': 'Unauthorized'}, 401
        
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 5, type=int)
        pagination = ReadingLog.query.filter_by(user_id=user_id).paginate(
            page=page, per_page=per_page, error_out=False)
        logs = pagination.items

        return {
            "page": page,
            "per_page": per_page,
            "total": pagination.total,
            "total_pages": pagination.pages,
            "moods": [ReadingLogSchema().dump(log) for log in logs]
        }, 200
    def post(self):
        user_id = session.get('user_id')
        if not user_id:
            return {'error': 'Unauthorized'}, 401
        
        data = request.get_json()

        date = data.get('date')
        books_read = data.get('books_read')
        pages_read = data.get('pages_read')
        words_read = data.get('words_read')

        if not date or not books_read or not pages_read or not words_read:
            return {'errors': 'Missing data'}, 422
        
        reading_log = ReadingLog(
            date=date,
            books_read=books_read,
            pages_read=pages_read,
            words_read=words_read,
            user_id=user_id
        )

        try:
            db.session.add(ReadingLog)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {'errors': [str(e)]}, 422

        return ReadingLogSchema().dump(reading_log), 201

class Log(Resource):
    def get(self, id):
        user_id = session.get('user_id')
        if not user_id:
            return {'error': 'Unauthorized'}, 401
        reading_log = ReadingLog.query.filter_by(id=id, user_id=user_id).first()
        if not reading_log:
            return {'error': 'Reading log not found'}, 404
        return ReadingLogSchema().dump(reading_log), 200
    def post(self, id):
        user_id = session.get('user_id')
        if not user_id:
            return {'error': 'Unauthorized'}, 401
        
        data = request.get_json()

        title = data.get('title')
        author = data.get('author')
        full_pages = data.get('full_pages')
        full_words = data.get('full_words')
        pages_read = data.get('pages_read')
        words_read = data.get('words_read')

        if not title or not author or not full_pages or not full_words or not pages_read or not words_read:
            return {'errors': 'Missing data'}, 422
        
        book = Book(
            title=title,
            author=author,
            full_pages=full_pages,
            full_words=full_words, 
            pages_read=pages_read,
            words_read=words_read,
            log_id=id
        )

        reading_log = ReadingLog.query.filter_by(id=id, user_id=user_id).first()

        reading_log.books_read += 1
        reading_log.pages_read += pages_read
        reading_log.words_read += words_read

        try:
            db.session.add(Book)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {'errors': [str(e)]}, 422

        return BookSchema().dump(book), 201
    def patch(self, id):
        user_id = session.get('user_id')
        if not user_id:
            return {'error': 'Unauthorized'}, 401
        reading_log = ReadingLog.query.filter_by(id=id, user_id=user_id).first()
        if not reading_log:
            return {'error': 'Reading log not found'}, 404
        data = request.get_json()
        reading_log.pages_read = data['pages_read']
        reading_log.words_read = data['words_read']
        db.session.commit()
        return {'message': 'Reading log updated'}, 200
    def delete(self, id):
        user_id = session.get('user_id')
        if not user_id:
            return {'error': 'Unauthorized'}, 401
        reading_log = ReadingLog.query.filter_by(id=id, user_id=user_id).first()
        if not reading_log:
            return {'error': 'Reading log not found'}, 404
        db.session.delete(reading_log)
        db.session.commit()
        return {'message': 'Reading log deleted'}, 200

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Logs, '/logs')
api.add_resource(Log, '/logs/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)