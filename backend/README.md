# Ingenuity Parking Backend

The backend utilizes Django, django-restql, and Django REST Framework to
provide a robust API that can be queried with GraphQL-like queries.

Its auth system uses Basic and Session authentication from dj-rest-auth and
Django.

The API itself is documented using drf-yasg, which provides an interactive
Swagger UI for easy exploration of the endpoints.

It makes use of pytest and pytest-django for testing, ensuring that the code is
well-tested and reliable. Moreover, testing is integrated into the CI/CD using
GitHub Actions.

> [!NOTE]
> Only custom logic is tested. The Django and DRF libraries are assumed to be
> well-tested and reliable, so they are not included in the test suite.

## Running locally

1. Install [uv](https://github.com/astral-sh/uv?tab=readme-ov-file#installation)
2. Sync dependencies:

```bash
uv sync --all-extras
```

3. Migrate the database:

```bash
uv run python manage.py migrate
```

4. Run the server:

```bash
uv run python manage.py runserver
```

5. (Optional) Create a superuser:

```bash
uv run python manage.py createsuperuser
```

6. (Optional) Run the tests:

```bash
uv run pytest
```

7. (Optional) View the Swagger documentation at
   `http://127.0.0.1:8000/api/docs/`.

