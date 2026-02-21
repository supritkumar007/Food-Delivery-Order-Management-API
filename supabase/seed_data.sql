-- SwiftBite Sample Seed Data
-- Run this in the Supabase SQL Editor

-- 1. Users (Customers, Owners, Drivers)
-- Note: We use gen_random_uuid() for seeding purposes. 
-- In a real app, these would come from auth.users.

INSERT INTO users (id, email, full_name, role, phone) VALUES
('d0e2f3a1-b4c5-6d7e-8f90-1a2b3c4d5e6f', 'customer@gmail.com', 'John Doe', 'CUSTOMER', '+1234567890'),
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'restaurant@gmail.com', 'Mario Rossi', 'RESTAURANT', '+1987654321'),
('f6e5d4c3-b2a1-0f9e-8d7c-6b5a4a3b2c1d', 'driver@gmail.com', 'Swift Rider', 'DRIVER', '+1122334455'),
('e1d2c3b4-a5f6-7890-1234-567890abcdef', 'admin@gmail.com', 'Admin User', 'ADMIN', '+1000000000');

-- 2. Restaurants
INSERT INTO restaurants (id, owner_id, name, address, rating) VALUES
('7a8b9c0d-1e2f-3a4b-5c6d-7e8f90a1b2c3', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Mario''s Pizza', '123 Italian Way, Food City', 4.8),
('1e2f3a4b-5c6d-7e8f-90a1-b2c3d4e5f6a7', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Burger Haven', '456 Grill St, Burger Town', 4.5);

-- 3. Drivers
INSERT INTO drivers (id, user_id, vehicle_type, is_available) VALUES
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'f6e5d4c3-b2a1-0f9e-8d7c-6b5a4a3b2c1d', 'Motorcycle', TRUE);

-- 4. Menus
INSERT INTO menus (id, restaurant_id, name) VALUES
('3a4b5c6d-7e8f-90a1-b2c3-d4e5f6a7b8c9', '7a8b9c0d-1e2f-3a4b-5c6d-7e8f90a1b2c3', 'Main Menu'),
('5c6d7e8f-90a1-b2c3-d4e5-f6a7b8c9d0e1', '1e2f3a4b-5c6d-7e8f-90a1-b2c3d4e5f6a7', 'Lunch Menu');

-- 5. Menu Items
INSERT INTO menu_items (id, menu_id, name, description, price, image_url) VALUES
(gen_random_uuid(), '3a4b5c6d-7e8f-90a1-b2c3-d4e5f6a7b8c9', 'Margherita Pizza', 'Classic tomato, mozzarella, and basil', 12.99, 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38'),
(gen_random_uuid(), '3a4b5c6d-7e8f-90a1-b2c3-d4e5f6a7b8c9', 'Pepperoni Feast', 'Double pepperoni with extra cheese', 15.50, 'https://images.unsplash.com/photo-1628840042765-356cda07504e'),
(gen_random_uuid(), '5c6d7e8f-90a1-b2c3-d4e5-f6a7b8c9d0e1', 'Classic Cheeseburger', 'Angus beef, cheddar, lettuce, tomato', 10.99, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'),
(gen_random_uuid(), '5c6d7e8f-90a1-b2c3-d4e5-f6a7b8c9d0e1', 'Crispy Fries', 'Large portion of golden fries', 4.50, 'https://images.unsplash.com/photo-1630384066252-4272428d4462');

-- 6. Sample Orders (Optional but helpful)
-- Let's add one pending order
INSERT INTO orders (id, customer_id, restaurant_id, total_amount, delivery_address, status) VALUES
('f9a8b7c6-d5e4-4f3a-8b2c-1d0e9f8a7b6c', 'd0e2f3a1-b4c5-6d7e-8f90-1a2b3c4d5e6f', '7a8b9c0d-1e2f-3a4b-5c6d-7e8f90a1b2c3', 28.49, '456 Customer Ave, Apt 12', 'PENDING');

-- 7. Order Items for the sample order
-- Redoing Menu Items with valid hex UUIDs for the sample order
DELETE FROM menu_items;
INSERT INTO menu_items (id, menu_id, name, description, price, image_url) VALUES
('b1a2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', '3a4b5c6d-7e8f-90a1-b2c3-d4e5f6a7b8c9', 'Margherita Pizza', 'Classic tomato, mozzarella, and basil', 12.99, 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38'),
('c2b3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', '3a4b5c6d-7e8f-90a1-b2c3-d4e5f6a7b8c9', 'Pepperoni Feast', 'Double pepperoni with extra cheese', 15.50, 'https://images.unsplash.com/photo-1628840042765-356cda07504e');

INSERT INTO order_items (order_id, menu_item_id, quantity, price_at_time) VALUES
('f9a8b7c6-d5e4-4f3a-8b2c-1d0e9f8a7b6c', 'b1a2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 1, 12.99),
('f9a8b7c6-d5e4-4f3a-8b2c-1d0e9f8a7b6c', 'c2b3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 1, 15.50);
