# 🍔 SwiftBite — Real-Time Food Delivery Orchestration Platform

> A production-inspired full-stack food delivery system built with **Go**, **Next.js**, and **Supabase** — designed to go well beyond a typical CRUD application.

---

## What is SwiftBite?

SwiftBite is a scalable, role-based food delivery platform inspired by real-world apps like Swiggy and Zomato. The goal was to build something that reflects how production systems actually work — with proper concurrency handling, a strict order lifecycle, real-time updates, and secure multi-role access control.

This isn't just a tutorial project. Every architectural decision here was made with system design principles in mind.

---

## Tech Stack

**Frontend**
- Next.js (App Router) + TypeScript
- Tailwind CSS + Framer Motion
- React Query for server state management

**Backend**
- Go (Golang) with the Fiber framework
- GORM for database interactions
- JWT Authentication via Supabase
- WebSockets for live order updates

**Database**
- Supabase PostgreSQL
- Row Level Security (RLS) policies
- Foreign keys, transactions, and indexed queries

---

## Role-Based Access

SwiftBite supports four distinct roles, each with its own dashboard and permissions:

**Customer**
Browse restaurants and menus without logging in, filter by Veg / Non-Veg, add items to cart, go through a simulated checkout and payment flow, then track their order in real time.

**Restaurant**
Full menu management (create, update, delete items), ability to accept incoming orders and move them through preparation stages, and access to earnings and order analytics.

**Driver**
Claim available deliveries through a concurrency-safe assignment system, update delivery status as they progress, and view their earnings history.

**Admin**
Platform-wide visibility — monitor all users, restaurants, and orders, and access aggregate analytics.

---

## Order Lifecycle

Every order follows a strict, enforced state machine:

```
PENDING → CONFIRMED → PREPARING → READY → PICKED_UP → DELIVERED
       ↘
        CANCELLED
```

Invalid transitions are rejected at the application layer. Every status change is logged to `order_status_logs`, wrapped in a database transaction, and broadcast to connected clients via WebSocket in real time.

---

## System Architecture

```
┌─────────────────────┐
│    Frontend          │
│    (Next.js)         │
└────────┬────────────┘
         │  REST APIs
         ▼
┌─────────────────────┐
│    Go Backend        │
│    (Fiber API)       │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Supabase PostgreSQL │
│  (Database + RLS)    │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│   WebSocket Hub      │
│  (Real-Time Updates) │
└─────────────────────┘
```

The frontend talks to the Go backend exclusively through REST APIs. The backend owns the state machine logic and wraps all critical operations in transactions. The database enforces data integrity and row-level security. The WebSocket hub pushes live updates to all relevant dashboards the moment an order status changes.

---

## End-to-End User Flow

1. User browses restaurants and menus (no login required)
2. Adds items to cart and proceeds to checkout
3. Logs in or registers at checkout
4. Completes simulated payment — order is created
5. Restaurant receives the order and begins preparing it
6. A driver picks up and delivers the order
7. Customer tracks every step of this in real time

---

## Security & Reliability

- Role-based access control enforced at both API and database layers
- JWT validation middleware on all protected routes
- Database transactions for all multi-step operations
- Optimistic locking to prevent race conditions during driver assignment
- Supabase RLS ensures users can only access data they're permitted to see

---

## Why This Project?

Most student projects stop at basic CRUD. SwiftBite was built to demonstrate the kind of thinking that matters in backend engineering — state machines, concurrency safety, real-time coordination, transactional integrity, and clean separation of concerns across a multi-role system.

It's the kind of project that's easier to explain in a system design interview because it was designed with those conversations in mind.
