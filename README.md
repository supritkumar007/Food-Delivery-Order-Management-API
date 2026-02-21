# 🍔 SwiftBite  
### Real-Time Food Delivery Orchestration Platform

<p align="center">
  <b>A production-inspired full-stack food delivery system built with Go, Next.js, and Supabase.</b><br/>
  Designed to demonstrate backend architecture, concurrency control, real-time systems, and modern UI/UX.
</p>

---

## 🚀 Overview

SwiftBite is a scalable, role-based food delivery platform inspired by applications like Swiggy and Zomato.

This project focuses on:

- Clean backend architecture (Go + Fiber)
- Strict order lifecycle state machine
- Concurrency-safe operations
- Real-time order tracking via WebSockets
- Supabase PostgreSQL with Row Level Security (RLS)
- Modern, responsive UI with Light/Dark mode support

It is built as a **placement-oriented system design project**, not just a CRUD application.

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS (Light/Dark Theme)
- Framer Motion (Animations)
- React Query (Data fetching & caching)

### Backend
- Go (Golang)
- Fiber framework
- GORM ORM
- JWT Authentication (Supabase)
- WebSocket for live updates

### Database
- Supabase PostgreSQL
- Row Level Security (RLS)
- Transactions & Foreign Keys
- Indexed queries for performance

---

## 👥 Role-Based System

SwiftBite supports four distinct roles, each with dedicated dashboards and permissions.

### 🧑 Customer
- Browse restaurants & food catalog (public access before login)
- Veg / Non-Veg filter
- Add to cart & checkout
- Simulated payment
- Real-time order tracking
- View order history & rate services

### 🏪 Restaurant
- Manage menu (Create / Update / Delete)
- Accept & update order status
- View earnings and order analytics

### 🚚 Driver
- View available delivery requests
- Accept delivery (concurrency-safe)
- Update pickup & delivery status
- Track earnings

### 🛠 Admin
- Monitor orders across platform
- Manage users & restaurants
- View system analytics

---

## 🔄 Order Lifecycle (State Machine)

Orders follow a strictly enforced transition model:
PENDING → CONFIRMED → PREPARING → READY → PICKED_UP → DELIVERED

or
PENDING → CANCELLED

Key properties:

- Invalid transitions are rejected at backend level
- All transitions are logged in `order_status_logs`
- Updates are wrapped inside database transactions
- Status changes are broadcast in real-time via WebSocket

This ensures consistency, reliability, and production-grade behavior.

---

## ⚙️ Engineering Highlights

- Clean Architecture (Handler → Service → Repository pattern)
- JWT-based role authorization
- Concurrency-safe order assignment
- Optimistic locking strategy
- Real-time updates via WebSockets
- Supabase Row Level Security
- Fully responsive design
- Light/Dark theme toggle with persistent preference

---

## 🏗 System Architecture
Frontend (Next.js)
↓
Go Backend (Fiber)
↓
Supabase PostgreSQL
↓
WebSocket Hub (Real-time Updates)

The frontend communicates via REST APIs and listens for order updates using WebSockets.

---

## 🛒 End-to-End User Flow

1. User browses restaurants (no login required)
2. Adds items to cart
3. Redirected to login/register on checkout
4. Payment simulation
5. Order created (PENDING)
6. Restaurant confirms and prepares
7. Driver accepts delivery
8. Order delivered with live tracking

Each step updates the database and triggers real-time UI updates.

---

## 🌗 UI & UX Features

- Food-delivery inspired layout
- Parallax hero section
- Glassmorphism cards
- Smooth hover & click animations
- Toast notifications
- Skeleton loaders
- Sticky navigation
- Responsive mobile-first design
- Light/Dark theme support

---

## 🔐 Security & Reliability

- Role-based route protection
- JWT validation middleware
- Input validation & DTO enforcement
- Database transactions for critical operations
- Concurrency-safe driver assignment
- Row Level Security policies in Supabase

---

## 📂 Project Structure
swiftBite/
│
├── backend-go/
│ ├── cmd/
│ ├── internal/
│ ├── pkg/
│ └── go.mod
│
├── frontend/
└── README.md

---

## 🧠 Design Summary

SwiftBite was designed with the following principles:

- Clear separation of concerns
- Strict state management
- Scalable backend logic
- Secure role-based operations
- Real-world food-commerce UX
- Production-inspired system modeling

This project demonstrates understanding of system design, distributed workflow coordination, and full-stack integration.
