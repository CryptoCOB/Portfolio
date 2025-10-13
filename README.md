# Portfolio – MERN Backend + React Client

This repo contains a full-stack portfolio application:
- Backend: Node.js + Express + Mongoose (MongoDB Atlas), JWT auth
- Frontend: React (Vite), Material UI, React Router

## Run locally

Prereqs: Node 18+ and a MongoDB Atlas connection string.

1. Copy envs and fill values:
   - Backend: `.env` from `.env.example`
   - Client functions (optional Netlify): `client/.env` from `client/.env.example`
2. Install deps at root and client:

```powershell
# At repo root
npm install
# Start both client and server concurrently
cd client
npm install
npm run dev
```

Backend listens on http://localhost:5001, client on http://localhost:5173

## API base

- Health: `GET /` – returns a simple message
- Contacts: `GET/POST/PUT/DELETE /api/contacts`
- Projects: `GET/POST/PUT/DELETE /api/projects` (write ops require JWT)
- Qualifications: `GET/POST/PUT/DELETE /api/qualifications` (write ops require JWT)
- Users: `GET/POST/PUT/DELETE /api/users` + `POST /api/users/register`, `POST /api/users/login`
- Services: `GET/POST/PUT/DELETE /api/services` (write ops require JWT)

JWT: send `Authorization: Bearer <token>` for protected endpoints.

## Screenshots for Assignment

Include in your Word doc:
1) MongoDB: Portfolio DB + collections, documents view, and connection string
2) Console: Server start + "MongoDB connected" log
3) API tests (EchoAPI/Postman): for all entities – GET all, GET by id, POST, PUT, DELETE, DELETE all
4) Auth: register, login (show token), and a protected write using the token
5) Error cases: missing fields, invalid ObjectId, unauthorized
6) (Optional) Frontend pages showing live data

## Deploy

- Client: Netlify (build `npm run build`, publish `dist/`)
- Backend: Render/Heroku/railway.app or on-prem Node; set envs `MONGODB_URI`, `MONGODB_DB`, `JWT_SECRET`, `PORT`

## License
MIT
