from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=True)

    reading_logs = db.relationship('ReadingLog', back_populates='user', 
                    cascade='all, delete-orphan', lazy='joined')
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")
    
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError("Username must be present")
        return username

    def __repr__(self):
        return f"<User {self.username}>"
    
class ReadingLog(db.Model):
    __tablename__ = "reading_logs"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    books_read = db.Column(db.Integer, nullable=False)
    words_read = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User', back_populates='reading_logs")
    books = db.relationship(
        "Book", backref="readinglog", lazy=True, cascade="all, delete-orphan")