# Backend ✅
Online at: `https://visita.onrender.com` for testing purpes 

## Description

This is a RESTful API for serving client requests. It is built using Node.js and Express.js and uses MongoDB as a database.

## TODO

- [ ] Add tests ⏳
- [ ] Add forget passwrod endpoint ⏳
- [ ] Add send welcome email endpoint ⏳
- [ ] Add more documentation ⏳
- [ ] Create a frontend ✅

## ENV Variables Required

```
PORT=XXXX
DB_USER=XXXX
DB_PASSWORD=XXXXXXXX
DB_HOST=XXXX
ADMIN_PASSWORD=XXXXXXXX
JWT_SECRET_KEY=XXXXXXXX
```

## Installation ✈

1. Clone the repository
2. Run `npm install` to install all dependencies
3. Add a `.env` file to the root directory of the project and add the above environment variables
4. Run `npm start` to start the server
5. Run `npm run dev` to start the dev server

## API Endpoints 📡

### Users (Protected) 🚨

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | /api/v1/users/signup | Create a new user |
| POST   | /api/v1/users/login  | Login a user      |
| GET    | /api/v1/users        | Get all users     |
| ------ | -------------------- | ----------------- |

### Places (Protected) 🚨

| Method | Endpoint                    | Description          |
| ------ | --------------------------- | -------------------- |
| GET    | /api/v1/places/:placeId     | Get place by id      |
| PATCH  | /api/v1/places/:placeId     | Update place by id   |
| DELETE | /api/v1/places/:placeId     | Delete place         |
| POST   | /api/v1/places/create       | Create new place     |
| GET    | /api/v1/places/user/:userId | Get place by user id |
| ------ | --------------------------- | -------------------- |
