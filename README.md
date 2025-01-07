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
        "id": 5,
        "name": "Leila Aylen",
        "lastname": "Salguero",
        "gender": "Female",
        "birthdate": "200.-04-25",
        "email": "leiisalguero@gmail.com",
        "phone": "1158079279",
        "maritalStatus": "Single",
        "createdAt": "2025-01-07T15:48:27.000Z",
        "updatedAt": "2025-01-07T16:30:35.000Z"
    },
    ...
]
```

⚡️ POST /api/people
Creates a new person.

Request Body:
```
{
        "name": "Leila Aylen",
        "lastname": "Salguero",
        "gender": "Female",
        "birthdate": "200.-04-25",
        "email": "leiisalguero@gmail.com",
        "phone": "1158079279",
        "maritalStatus": "Single"
    },
```

⚡️ PUT /api/people/:id
Updates a person by id.
You can send all fields or send only the one you want to update.

Request Body:
```
{
    "name": "Leila Aylen",
     "lastname": "Salguero",
     "gender": "Female",
     "birthdate": "200.-04-25",
     "email": "leiisalguero@gmail.com",
     "phone": "1158079279",
     "maritalStatus": "Single"
}
```

⚡️ DELETE /api/people/:id
Deletes a person by their id.

