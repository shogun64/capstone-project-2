# Reading Log Database

This full-stack project creates a reading log database for use by people who wish to keep track of their reading progress for goals.
This includes both keeping track of how much you've read on any given day, and how much you've read of individual books.

## Setup

After cloning the git repository:

Frontend: cd client, then npm install inside to install all dependencies, and npm run dev to open the project.
Backend: cd server, then pip install -r requirements.txt, pipenv shell, and the following:
  export FLASK_RUN_PORT=5555
  export FLASK_APP=app.py
and finally, flask run to start the backend.

## Endpoints

(/) The home page, which offers a brief introduction.

(/login) The login/signup page.

(/logs) A page that shows all the reading logs for the given user.
  (/logs/new) A page for creating a new log.
  (/logs/{logid}) A page for each log, displaying the books associated with it, and a form for adding a new book to that log.
