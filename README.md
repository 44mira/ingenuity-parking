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
