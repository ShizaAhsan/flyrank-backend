# FlyRank Backend API

## What This Is

FlyRank Backend API is a REST API built with Node.js and Express.js for managing tasks.

The project provides complete CRUD operations:
- Create tasks
- Read tasks
- Update tasks
- Delete tasks

It also includes API documentation using Swagger UI.

---

## Installation & Running

Clone the repository:

```bash
git clone https://github.com/ShizaAhsan/flyrank-backend.git
```

Install dependencies:

```bash
npm install
```

Run the server:

```bash
node server.js
```

The API will be available at:

```
http://localhost:3000
```

Swagger documentation:

```
http://localhost:3000/docs
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Health check |
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

---

## Curl Test Output

Example:

```bash
curl -i http://localhost:3000/tasks
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "title": "Learn Backend",
    "done": false
  }
]
```

---

## Swagger UI Screenshot

Swagger UI documentation

![Swagger UI](image.png)