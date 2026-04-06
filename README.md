# 💰 Finance Dashboard Backend (Full Stack Implementation)

## 🚀 Overview

This project is a full-stack finance dashboard system designed to manage financial records with role-based access control and provide analytical insights.

It demonstrates backend design, data modeling, access control, and API structuring along with a connected frontend dashboard.

---

## 🎯 Features

### 🔐 User & Role Management

* Create and manage users
* Role-based access:

  * **Viewer** → view dashboard only
  * **Analyst** → view records + insights
  * **Admin** → full control (CRUD + user management)
* Activate / deactivate users

---

### 💰 Financial Records

* Create, update, delete records
* Fields:

  * Amount
  * Type (income / expense)
  * Category
  * Date
  * Notes
* Filtering support:

  * By type
  * By category
  * By date range

---

### 📊 Dashboard APIs

* Total income
* Total expenses
* Net balance
* Category-wise totals
* Recent transactions
* Monthly & weekly trends

---

### 🔒 Access Control

* Middleware-based authorization
* Role restrictions enforced on backend:

  * Viewer → read-only
  * Analyst → read + insights
  * Admin → full access

---

### ⚠️ Validation & Error Handling

* Input validation for all APIs
* Proper status codes
* Clear error messages
* Unauthorized access protection

---

### 🗄️ Data Persistence

* MongoDB (via Mongoose)
* Structured schema for:

  * Users
  * Records

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication

### Frontend

* React (Vite)
* Axios

---

## 🌐 Live Demo

Frontend: https://finance-backend-vert.vercel.app/
Backend API: https://financebackend-6x0t.onrender.com

---

## 🔗 API Endpoints

### Auth

* POST `/api/v1/auth/register`
* POST `/api/v1/auth/login`

### Records

* GET `/api/v1/records`
* POST `/api/v1/records`
* PUT `/api/v1/records/:id`
* DELETE `/api/v1/records/:id`

### Dashboard

* GET `/api/v1/dashboard/summary`
* GET `/api/v1/dashboard/trends`

### Users (Admin Only)

* GET `/api/v1/users`
* PUT `/api/v1/users/:id`

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Vaibhavsanap112/FinanceBackend.git
cd project
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
```

Run:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Demo Credentials

Admin:

```
email: vaibhav@gmail.com
password: 123456
```

---

## 💡 Design Decisions

* Used JWT for stateless authentication
* Role-based middleware for access control
* Aggregation logic implemented for dashboard analytics
* Clean separation of routes, controllers, and models

---

## 📌 Assumptions

* Single-tenant system
* Basic authentication flow
* Simplified UI for demonstration

---

## 🚀 Possible Improvements

* Pagination for records
* Search functionality
* Rate limiting
* Unit testing
* Swagger API documentation

---

## 👨‍💻 Author

Vaibhav Sanap
