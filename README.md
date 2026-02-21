🍔 SwiftBite
Real-Time Food Delivery Orchestration Platform

SwiftBite is a full-stack food delivery application inspired by platforms like Swiggy and Zomato.
It is built to demonstrate backend engineering, system design, concurrency handling, and modern UI/UX.

🚀 Tech Stack

Frontend

Next.js + TypeScript

Tailwind CSS (Light/Dark Mode)

Framer Motion

React Query

Backend

Go (Golang)

Fiber framework

GORM ORM

WebSockets (Real-time updates)

Database

Supabase PostgreSQL

Row Level Security (RLS)

Transactions & Constraints

👥 User Roles

SwiftBite supports four role-based dashboards:

🧑 Customer

Browse restaurants & food catalog (before login)

Veg / Non-Veg filtering

Add to cart & checkout

Simulated payment

Real-time order tracking

Order history & ratings

🏪 Restaurant

Manage menu (CRUD)

Accept & update order status

View revenue & analytics

🚚 Driver

View available deliveries

Accept order (concurrency-safe)

Update delivery status

View earnings

🛠 Admin

Monitor platform

Manage users & restaurants

View analytics

🔄 Order Lifecycle (State Machine)

Orders follow a strict transition model:

PENDING → CONFIRMED → PREPARING → READY → PICKED_UP → DELIVERED
(or CANCELLED)

Invalid transitions are blocked at backend level.
All updates are logged and broadcast in real-time.

⚙️ Key Engineering Highlights

Role-based access control (JWT)

Concurrency-safe order acceptance

Optimistic locking

Database transactions

WebSocket live tracking

Light/Dark theme toggle

Fully responsive UI

Clean architecture (Handler → Service → Repository)

🏗 System Architecture

Frontend (Next.js)
⬇
Go Backend (Fiber)
⬇
Supabase PostgreSQL
⬇
WebSocket Hub (Live Updates)

🛒 End-to-End Flow

Browse → Add to Cart → Checkout → Payment →
Restaurant Confirms → Driver Delivers → Real-time Tracking → Completion

📌 Why This Project Matters

This project demonstrates:

Full-stack engineering

Backend architecture design

State machine modeling

Concurrency handling

Secure role-based systems

Real-time communication

Production-ready UI/UX

It goes beyond a simple CRUD application and focuses on real-world system design concepts.
