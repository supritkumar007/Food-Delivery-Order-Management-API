package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserRole string

const (
	RoleCustomer   UserRole = "CUSTOMER"
	RoleRestaurant UserRole = "RESTAURANT"
	RoleDriver     UserRole = "DRIVER"
	RoleAdmin      UserRole = "ADMIN"
)

type User struct {
	ID        uuid.UUID      `gorm:"type:uuid;primaryKey;default:auth.uid()" json:"id"`
	Email     string         `gorm:"unique;not null" json:"email"`
	FullName  string         `gorm:"not null" json:"full_name"`
	Role      UserRole       `gorm:"type:user_role;default:'CUSTOMER'" json:"role"`
	Phone     string         `json:"phone"`
	IsDeleted bool           `gorm:"default:false" json:"is_deleted"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type Restaurant struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	OwnerID   uuid.UUID `gorm:"type:uuid" json:"owner_id"`
	Name      string    `gorm:"not null" json:"name"`
	Address   string    `gorm:"not null" json:"address"`
	Rating    float64   `gorm:"type:decimal(2,1);default:0" json:"rating"`
	IsActive  bool      `gorm:"default:true" json:"is_active"`
	CreatedAt time.Time `json:"created_at"`
}

type Driver struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID      uuid.UUID `gorm:"type:uuid" json:"user_id"`
	VehicleType string    `json:"vehicle_type"`
	IsAvailable bool      `gorm:"default:true" json:"is_available"`
	CurrentLat  float64   `json:"current_lat"`
	CurrentLong float64   `json:"current_long"`
	CreatedAt   time.Time `json:"created_at"`
}

type OrderStatus string

const (
	StatusPending   OrderStatus = "PENDING"
	StatusConfirmed OrderStatus = "CONFIRMED"
	StatusPreparing OrderStatus = "PREPARING"
	StatusReady     OrderStatus = "READY"
	StatusPickedUp  OrderStatus = "PICKED_UP"
	StatusDelivered OrderStatus = "DELIVERED"
	StatusCancelled OrderStatus = "CANCELLED"
)

type Order struct {
	ID              uuid.UUID   `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	CustomerID      uuid.UUID   `gorm:"type:uuid" json:"customer_id"`
	RestaurantID    uuid.UUID   `gorm:"type:uuid" json:"restaurant_id"`
	DriverID        *uuid.UUID  `gorm:"type:uuid" json:"driver_id"`
	Status          OrderStatus `gorm:"type:order_status;default:'PENDING'" json:"status"`
	TotalAmount     float64     `gorm:"type:decimal(10,2);not null" json:"total_amount"`
	DeliveryAddress string      `gorm:"not null" json:"delivery_address"`
	Version         int         `gorm:"default:1" json:"version"` // For optimistic locking
	CreatedAt       time.Time   `json:"created_at"`
	UpdatedAt       time.Time   `json:"updated_at"`
	Items           []OrderItem `gorm:"foreignKey:OrderID" json:"items"`
}

type OrderItem struct {
	ID            uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	OrderID       uuid.UUID `gorm:"type:uuid" json:"order_id"`
	MenuItemID    uuid.UUID `gorm:"type:uuid" json:"menu_item_id"`
	Quantity      int       `gorm:"not null" json:"quantity"`
	PriceAtTime   float64   `gorm:"type:decimal(10,2);not null" json:"price_at_time"`
}

type OrderStatusLog struct {
	ID        uuid.UUID   `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	OrderID   uuid.UUID   `gorm:"type:uuid" json:"order_id"`
	Status    OrderStatus `gorm:"type:order_status" json:"status"`
	ChangedBy *uuid.UUID  `gorm:"type:uuid" json:"changed_by"`
	Reason    string      `json:"reason"`
	CreatedAt time.Time   `json:"created_at"`
}
