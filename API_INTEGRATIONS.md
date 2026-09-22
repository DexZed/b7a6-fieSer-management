# API Integrations Documentation

Welcome to the API Integrations documentation. This guide details all available endpoints, required roles, parameters, and routes across the core modules of the application. The global route prefix for all endpoints is `/api`.

---

## 1. Departments (`/api/departments`)

- **Role Required:** `admin`

| Method   | Endpoint                        | Summary                                            | Parameters / Body                                                    |
| -------- | ------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| **GET**  | `/api/departments`              | Get all departments with search and pagination     | `search` (query), `page` (query), `limit` (query)                    |
| **POST** | `/api/departments`              | Create a new department                            | Body: `{ code, name, description? }`                                 |
| **GET**  | `/api/departments/:id`          | Get department details by ID with statistics       | `id` (path, number)                                                  |
| **GET**  | `/api/departments/:id/subjects` | List subjects in a department with pagination      | `id` (path, number), `page` (query), `limit` (query)                 |
| **GET**  | `/api/departments/:id/classes`  | List classes in a department with pagination       | `id` (path, number), `page` (query), `limit` (query)                 |
| **GET**  | `/api/departments/:id/users`    | List users in a department by role with pagination | `id` (path, number), `role` (query), `page` (query), `limit` (query) |

---

## 2. Classes (`/api/classes`)

- **Role Required:** `teacher`

| Method   | Endpoint                 | Summary                                     | Parameters / Body                                                                       |
| -------- | ------------------------ | ------------------------------------------- | --------------------------------------------------------------------------------------- |
| **GET**  | `/api/classes`           | Get all classes with filters and pagination | `search` (query), `subject` (query), `teacher` (query), `page` (query), `limit` (query) |
| **POST** | `/api/classes`           | Create a new class                          | Body: `Prisma.ClassCreateInput`                                                         |
| **GET**  | `/api/classes/:id`       | Get class details by ID                     | `id` (path, number)                                                                     |
| **GET**  | `/api/classes/:id/users` | Get users in a class by role                | `id` (path, number), `role` (query), `page` (query), `limit` (query)                    |

---

## 3. Enrolments (`/api/enrolments`)

- **Role Required:** `student`

| Method   | Endpoint               | Summary              | Parameters / Body           |
| -------- | ---------------------- | -------------------- | --------------------------- |
| **POST** | `/api/enrolments`      | Create an Enrollment | Body: `CreateEnrollmentDto` |
| **POST** | `/api/enrolments/join` | Join an Enrollment   | Body: `JoinEnrollmentDto`   |

---

## 4. Payments (`/api/payments`)

- **Role Required:** `student`

| Method   | Endpoint                 | Summary                            | Parameters / Body                                          |
| -------- | ------------------------ | ---------------------------------- | ---------------------------------------------------------- |
| **POST** | `/api/payments/checkout` | Create a new checkout session      | Body: `ChechoutSessionBody` (Requires active user session) |
| **GET**  | `/api/payments/verify`   | Verify and fulfill payment session | `sessionId` (query) (Requires active user session)         |

---

## 5. Stats (`/api/stats`)

- **Role Required:** `admin`

| Method  | Endpoint              | Summary               | Parameters / Body                 |
| ------- | --------------------- | --------------------- | --------------------------------- |
| **GET** | `/api/stats/overview` | Get overview of stats | None                              |
| **GET** | `/api/stats/latest`   | Get latest stats      | `limit` (query, optional integer) |
| **GET** | `/api/stats/charts`   | Get charts data       | None                              |

---

## 6. Subjects (`/api/subjects`)

- **Role Required:** `teacher`

| Method   | Endpoint                    | Summary                                        | Parameters / Body                                                       |
| -------- | --------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------- |
| **GET**  | `/api/subjects`             | Lists all subjects                             | `search` (query), `department` (query), `page` (query), `limit` (query) |
| **POST** | `/api/subjects`             | Creates a new subject                          | Body: `SubjectBody`                                                     |
| **GET**  | `/api/subjects/:id`         | Returns a specific subject details with counts | `id` (path)                                                             |
| **GET**  | `/api/subjects/:id/classes` | Returns a specific subject classes with counts | `id` (path), `page` (query), `limit` (query)                            |
| **GET**  | `/api/subjects/:id/users`   | Returns Users per subject                      | `id` (path), `role` (query), `page` (query), `limit` (query)            |

---

## 7. Users (`/api/users`)

- **Role Required:** `admin`, `teacher`

| Method  | Endpoint                     | Summary              | Parameters / Body                                                 |
| ------- | ---------------------------- | -------------------- | ----------------------------------------------------------------- |
| **GET** | `/api/users`                 | Get All Users        | `search` (query), `role` (query), `page` (query), `limit` (query) |
| **GET** | `/api/users/:id`             | Get user by id       | `id` (path)                                                       |
| **GET** | `/api/users/:id/departments` | Get user departments | `id` (path), `page` (query), `limit` (query)                      |
| **GET** | `/api/users/:id/subjects`    | Get user subjects    | `id` (path), `page` (query), `limit` (query)                      |

---

## 8. Auth (`/api/auth/{*path}`)

- **Better Auth:** Explicitly Handled By Better-auth Library

| Method   | Endpoint                        | Summary                                          | Parameters / Body                                                                                                                                                                                                                                                                                                                                  |
| -------- | ------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **POST** | `/api/auth/sign-up/email`       | Create new user with email and password          | `email`, `password (min 8 chars)`, `Name`, `role` (optional, default: student), `rememberMe` optional (defaults true)                                                                                                                                                                                                                              |
| **POST** | `/api/auth/sign-in/email`       | Sign In with email and password                  | `email`, `password` (From Body) , `rememberMe` optional (defaults true)                                                                                                                                                                                                                                                                            |
| **GET**  | `/api//auth/sign-out`           | Signs Out the User                               | No Parameters required                                                                                                                                                                                                                                                                                                                             |
| **POST** | `/api//api/auth/sign-in/social` | Signs in the user with social Provider By Google | This is a special route that directly requires going to `"[origin-url]/google-test.html"` in browser to trigger this API call. Origin Url might be different based on how this project is used. If local then `"http:localhost:3000/google-test.html"` or if in production, eg vercel , then `"http:{dynamic_domain}.vercel.app/google-test.html"` |

---

> **Note:** All endpoints are protected by a global `RoleGuard` requiring authentication and the specific roles designated per controller.
