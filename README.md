# MiniApp Backend

Node.js + Express backend for the MiniApp project.

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose

## Setup

```bash
npm install
```

Create `.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/miniapp
```

Run:

```bash
nodemon index.js
```

Server:

```text
http://localhost:5000
```

## API

```text
GET /
```

Returns:

```json
{
  "message": "Task Manager API is running"
}
```
