from marshmallow import Schema, fields

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.String()
    reading_logs = fields.Nested(lambda: ReadingLogSchema(exclude=("user",)),many=True)

class ReadingLogSchema(Schema):
    id = fields.Int(dump_only=True)
    date = fields.Date()
    books_read = fields.Int()
    pages_read = fields.Int()
    words_read = fields.Int()
    user = fields.Nested(lambda: UserSchema(exclude=("reading_logs",)))
    books = fields.Nested(lambda: BookSchema(many=True))

class BookSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.String()
    author = fields.String()
    pages = fields.Int()
    words = fields.Int()