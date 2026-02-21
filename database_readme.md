# Database Documentation - SwiftBite

This document provides a guide to setting up and managing the Supabase PostgreSQL database for the SwiftBite platform.

## 1. Setup Instructions

### SQL Editor Setup
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open the **SQL Editor** from the left sidebar.
3. Click **New Query**.
4. Copy and paste the contents of `supabase/migrations/20260220_init.sql` and click **Run**.

### Enabling Row Level Security (RLS)
The migration script automatically enables RLS for core tables. You can verify this in the **Table Editor** under the "Authentication" or "Security" settings for each table.

## 2. Core Schema Overview

### Enums
- `user_role`: `CUSTOMER`, `RESTAURANT`, `DRIVER`, `ADMIN`
- `order_status`: `PENDING`, `CONFIRMED`, `PREPARING`, `READY`, `PICKED_UP`, `DELIVERED`, `CANCELLED`

### Key Tables
- `orders`: Manages the lifecycle and state of food delivery.
- `order_status_logs`: Provides an audit trail for every status transition.
- `drivers`: Tracks driver availability and real-time location.

## 3. Transaction Example (Concurrency Handling)

To ensure multiple drivers don't accept the same order simultaneously, we use `UPDATE ... WHERE ... AND version = ...`:

```sql
BEGIN;
UPDATE orders
SET driver_id = 'DRIVER_UUID',
    status = 'CONFIRMED',
    version = version + 1
WHERE id = 'ORDER_UUID'
  AND status = 'PENDING'
  AND driver_id IS NULL
  AND version = 1;

-- Check if any rows were affected
-- If rows_affected == 0, rollback or handle failure
COMMIT;
```

## 4. RLS Policy Queries

View existing policies:
```sql
SELECT * FROM pg_policies WHERE tablename = 'orders';
```

## 5. Environment Configuration
Ensure your `.env` file contains:
```env
DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@db.mjeesrfarsigyabmunoj.supabase.co:5432/postgres"
SUPABASE_URL="https://mjeesrfarsigyabmunoj.supabase.co"
SUPABASE_ANON_KEY="sb_publishable_LULOJS0KHxj4Oecm4ZTbdg_hDXrWban"
```
