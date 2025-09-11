from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, User, ReadingLog, Book
from datetime import date

fake = Faker()

with app.app_context():
    print("Deleting all data...")
    Book.query.delete()
    ReadingLog.query.delete()
    User.query.delete()

    print("Creating Users...")
    users = []
    usernames = []

    for i in range(5):
        username = fake.first_name()
        while username in usernames:
            username = fake.first_name()
        usernames.append(username)

        user = User(username=username)
        user.password_hash = user.username + 'password'
        users.append(user)

    db.session.add_all(users)

    print("Creating logs...")
    logs = []
    for i in range(25):
        log = ReadingLog(date=fake.date_object(),
                         books_read=0, pages_read=0, words_read=0)
        log.user = rc(users)
        logs.append(log)

    db.session.add_all(logs)
    
    print("Logging Books...")
    books = []
    for i in range(50):
        title = fake.paragraph(nb_sentences=1)
        author = fake.name()
        full_pages = randint(10, 1000)
        full_words = randint(full_pages * 10, full_pages * 100)
        pages_read = randint(1, full_pages)
        words_read = randint(pages_read * 10, full_words)
        book = Book(title=title, author=author, full_pages=full_pages,
                    full_words=full_words, pages_read=pages_read,
                    words_read=words_read)
        randlog = randint(0, 24)
        book.reading_log = logs[randlog]
        logs[randlog].books_read += 1
        logs[randlog].pages_read += pages_read
        logs[randlog].words_read += words_read
        books.append(book)
        
    db.session.add_all(books)

    db.session.commit()
    print("Complete.")