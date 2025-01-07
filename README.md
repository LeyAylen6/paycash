# 💸 Paycash - People 💸

## 📌 About this project

This project implements a RESTful API for managing a people catalog, using CQRS and Mediator patterns. It allows performing CRUD operations on a set of people, including create, read, update, and delete.

- __Back End__: Node.js, Express, Sequelize
- __Database__: MySQL

### 📌 How to get started?

This project requires a `.env` file in the root directory for configuring your database and server.

File structure for `.env`:
- `DB_HOST='localhost'`
- `DB_USER='username'`
- `DB_PASSWORD='password'`
- `DB_NAME='database_name'`
- `PORT=3000`

#### ❓ Where do I find this data?
- You need to create a MySQL database on your system with a username and password. These are the `DB_USER` and `DB_PASSWORD`.
- `PORT` will be the port your server runs on.
- `DB_HOST` is the host where your MySQL database is running.
- `DB_NAME` is the name of your database.

📍 To set up and run the project:

1. In the root directory:
   - Create a `.env` file as explained above.

2. In the Server folder:
   - Run `npm install`
   - Run `npm start`

3. In the Client folder (optional if you want to set up a front-end):
   - Run `npm install`
   - Run `npm start`

## 📌 API Routes

### ⚡️ `GET /api/people`
- Retrieves the list of all people.

**Response Example:**
```
[
    {
        "id": 1,
        "name": "John",
        "lastname": "Doe",
        "email": "john.doe@example.com"
    },
    ...
]
```

⚡️ GET /api/people/:id
Retrieves the details of a person by their id.

Response Example:
```
{
    "id": 1,
    "name": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
}
```

⚡️ POST /api/people
Creates a new person.

Request Body:
```
{
    "name": "Jane",
    "lastname": "Doe",
    "email": "jane.doe@example.com"
}
```

⚡️ PUT /api/people/:id
Updates a person by id.

Request Body:
```
{
    "name": "Jane",
    "lastname": "Smith",
    "email": "jane.smith@example.com"
}
```

⚡️ DELETE /api/people/:id
Deletes a person by their id.

