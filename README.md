# SkillBridge Backend 🎓

"Connect with Expert Tutors, Learn Anything"

---

## 📌 Overview

SkillBridge Backend is a RESTful API that powers the SkillBridge platform.  
It manages authentication, tutor profiles, bookings, reviews, and admin controls.

This API supports three roles:

- 👨‍🎓 Student
- 👨‍🏫 Tutor
- 🛠️ Admin

---

---

## 🔐Admin credentials

- Email: admin@email.com
- password: admin1234

## 🛠️ Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Bcrypt
- Role-Based Authorization
- REST API Architecture

---

## 📁 Project Structure

```bash
src/
 ├── config/
 |    └── index.ts
 ├── middleware/
 │    └── auth.ts
 ├── lib/
 │    ├── cron.ts
 │    ├── prisma.ts
 ├── modules/
 │    ├── auth/
 │    ├── availability/
 │    ├── booking/
 │    └── category/
 │    └──review/
 │    └──tutor/
 │    └──user/
 ├── routes/
 │    └── index.ts
 ├── seeds/
 │    └── seedAdmin.ts
 ├── app.ts
 └── server.ts

```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```bash
PORT=4000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@email.com
ADMIN_PASSWORD=admin1234
NODE_ENV=development
```

---

## 🚀 Installation & Setup

```bash
# Clone repository
git clone <your-backend-repo-url>

# Navigate to backend
cd skill-bridge-backend

# Install dependencies
npm install

# Run development server
npm run dev

Server runs on
http://localhost:4000

```

---

## 🔐 Authentication

SkillBridge uses JWT-based authentication.

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login user        |

---

## 📚 API Modules

👨‍🏫 Tutors (Public)

| Method | Endpoint          | Description                 |
| ------ | ----------------- | --------------------------- |
| GET    | `/api/tutors`     | Get all tutors with filters |
| GET    | `/api/tutors/:id` | Get tutor details           |
| GET    | `/api/categories` | Get all categories          |

```bash
Booking Status:
CONFIRMED
COMPLETED
CANCELLED
```

---

## ⭐ Reviews

| Method | Endpoint                | Description  |
| ------ | ----------------------- | ------------ |
| POST   | `/api/bookingId/review` | Leave review |

---

## 👨‍🏫 Tutor Management

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| PUT    | `/api/tutors`       | Update tutor profile |
| GET    | `/api/availability` | GET availability     |
| POST   | `/api/availability` | Create availability  |

---

## 🛠️ Admin

| Method | Endpoint                | Description       |
| ------ | ----------------------- | ----------------- |
| GET    | `/api/users/all-users`  | Get all users     |
| PUT    | `/api/users/status/:id` | Ban/unban users   |
| GET    | `/api/bookings`         | View all bookings |
| POST   | `/api/categories`       | Create category   |
| PUT    | `/api/categories/:id`   | Update category   |

---

## 🗄️ Database Schema

```bash

Roles:
  ADMIN
  TUTOR
  STUDENT

User Status
  ACTIVE
  BANNED


Booking Status
  CONFIRMED
  CANCELED
  COMPLETED
```

### Models

```bash
User
  id
  email
  password
  name
  role
  status
  imageUrl

  createdAt
  updatedAt



TutorProfile
  id
  bio
  experience
  hourlyRate
  isFeatured
  totalReviews
  averageRating

  createdAt
  updatedAt


Category
  id
  categoryName

  createdAt


Availability
  id
  startTime
  endTime
  totalPrice
  createdAt
  updatedAt
  isBooked

Booking
  id
  notes
  status
  tutorId
  studentId
  availabilityId

  createdAt


Review
  id
  rating
  comment
  studentId
  tutorId
  bookingId

  createdAt
```

---

## 🔒 Role-Based Access Control

Student → Can book & review

Tutor → Can manage availability & sessions

Admin → Full platform control

---

## 🧪 Seed Admin

```bash
npm run seed:admin
```

---

## 👨‍💻 Author

Anik Das

Skill-Bridge Backend API
