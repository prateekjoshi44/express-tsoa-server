# Express TSOA Server Boilerplate

This repository provides a **production-ready boilerplate** for building scalable backend applications with **Express.js**, **TypeScript**, **TSOA**, and **Prisma ORM**.

It’s designed to get you started quickly with a **typed API**, **auto-generated Swagger documentation**, and **database integration**.

---

## Features

- **Express.js** – Lightweight and flexible Node.js framework
- **TSOA** – Automatically generates OpenAPI (Swagger) documentation from TypeScript decorators
- **Prisma ORM** – Type-safe and modern ORM for database management
- **TypeScript** – Full type-safety and clean developer experience
- **Migrations** – Easy database schema management with Prisma Migrate
- **Pre-configured scripts** – For routes, Swagger generation, and database setup

---

## Getting Started

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd express-tsoa-server
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Prisma

1. Update `prisma/schema.prisma` with your models.

2. Set your database connection string in `.env`:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
   ```

3. Run initial migration:

   ```bash
   npx prisma migrate dev --name init
   ```

4. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

### 4️⃣ Generate TSOA Routes & Swagger

```bash
npm run tsoa:routes
npm run tsoa:swagger
```

### 5️⃣ Start the Server

```bash
npm run dev
```

Server will start on the configured port.
Swagger docs available at: **`http://localhost:<port>/docs`**

---

## Example Prisma Model

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String   @db.VarChar(255)
  createdAt DateTime @default(now()) @db.Timestamp(6)
  content   String?
  published Boolean  @default(false)
  authorId  Int
  User      User     @relation(fields: [authorId], references: [id], onDelete: NoAction, onUpdate: NoAction)
}
```

---

## Available Scripts

| Script                 | Description                          |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Start server in development mode     |
| `npm run build`        | Build the project                    |
| `npm run tsoa:routes`  | Generate TSOA routes                 |
| `npm run tsoa:swagger` | Generate OpenAPI spec (Swagger docs) |

---

## Override Swagger Docs Info

If you want to customize Swagger metadata:

```ts
(swaggerDocument as any).info.title = "Express TSOA Server";
(swaggerDocument as any).info.description =
  "API documentation for the Express TSOA Server";
```

---

## References

- [TSOA Documentation](https://tsoa-community.github.io/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/)

---

This boilerplate is ideal for quickly spinning up a **type-safe API with auto-generated documentation and a connected database**.
