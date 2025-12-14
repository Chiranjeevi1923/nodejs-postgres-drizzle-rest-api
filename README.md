# Node.js REST API with PostgreSQL & Drizzle ORM

A modern, production-ready REST API built using **Node.js**, **Express**, **PostgreSQL**, and **Drizzle ORM**.  
This repository demonstrates clean backend architecture, database best practices, and scalable API design.

---

## 🚀 Tech Stack

- **Node.js** – Backend runtime
- **Express.js** – REST API framework
- **PostgreSQL** – Relational database
- **Drizzle ORM** – Type-safe SQL ORM
- **Docker & Docker Compose** – Local database setup
- **dotenv** – Environment variable management

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/myapp_db
```

## 🐳 PostgreSQL with Docker

Start PostgreSQL using Docker Compose:
```
docker compose up -d
```

Stop PostgreSQL:
```
docker compose down
```

To Open Drizzle Studio:
```
npx drizzle-kit studio
```

# 📖 Learning Goals
- Understand how to set up a REST API with Node.js and Express.
- Learn to interact with PostgreSQL using Drizzle ORM.
- Implement best practices for API design and database management.
- Gain experience with Docker for local development environments.
- Explore environment variable management for secure configuration.
- Familiarize with database migrations and schema management using Drizzle Kit.
- Develop skills in writing clean, maintainable, and scalable backend code.
---