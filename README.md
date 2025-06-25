# Ingenuity Parking

To run this project, both the frontend and backend must be running.

Both of the instructions on how to run either are found within their respective
directories `./frontend` and `./backend`.

## Tech Stack

### Backend
- Django
- Django Rest Framework

### Frontend
- Vite + React + Typescript
- React Router

### Database
- SQLite

## Development notes

This project has not been deployed live because of both factors time and
inexperience when it comes to deploying a fullstack application. But it does
currently have GitHub actions setup that run tests for both the frontend
(albeit the frontend doesn't actually have any tests currently as most of the
code used simply involved invoking library functions) and backend of the code
to ensure code correctness.

Important development steps can be found within the closed issues and pull
requests of this repository, and to simulate code reviews, I had Copilot review
the PRs.

## AI Tools used

- Copilot
  - Writing tedious tests
  - Reviewing PRs
- ChatGPT, Claude
  - Debugging Frontend

## Personal notes

I was unfortunately unable to fully complete the user stories and implement a
proper frontend implementation of the project due to time constraints and
burnout from dedicating about double the hours any human being should probably
commit to a week-long project (not to mention my ongoing internship hahah).

Moreover, I admit that my frontend capabilities are definitely not equal to my
backend experience (in a bad way) and I would very much like to improve upon it
by working with much more experienced developers.

Lastly, as you can see by the open issues in the repository, I had originally
planned on setting up asynchronous tasks via Celery and RabbitMQ but I
unfortunately had to scrap that in favor of setting up basic CRUD functionality
for the frontend, which was incredibly time-consuming (especially auth). But
that would have allowed me to dynamically set the status and send notification
items to the users.
