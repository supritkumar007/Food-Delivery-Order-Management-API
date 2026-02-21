package repositories

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/yourusername/swiftbite/internal/database"
	"github.com/yourusername/swiftbite/internal/models"
	"github.com/yourusername/swiftbite/internal/state_machine"
	"gorm.io/gorm"
)

var (
	ErrOrderNotFound      = errors.New("order not found")
	ErrConcurrencyConflict = errors.New("order was updated by another process")
)

type OrderRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (*models.Order, error)
	UpdateStatus(ctx context.Context, orderID uuid.UUID, newStatus models.OrderStatus, version int) (*models.Order, error)
	AcceptOrder(ctx context.Context, orderID uuid.UUID, driverID uuid.UUID, version int) (*models.Order, error)
}

type orderRepository struct {
	db *gorm.DB
}

func NewOrderRepository() OrderRepository {
	return &orderRepository{db: database.DB}
}

func (r *orderRepository) GetByID(ctx context.Context, id uuid.UUID) (*models.Order, error) {
	var order models.Order
	if err := r.db.WithContext(ctx).Preload("Items").First(&order, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrOrderNotFound
		}
		return nil, err
	}
	return &order, nil
}

func (r *orderRepository) UpdateStatus(ctx context.Context, orderID uuid.UUID, newStatus models.OrderStatus, version int) (*models.Order, error) {
	var order models.Order
	err := r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		// Get current state with lock
		if err := tx.Clauses(gorm.Expr("FOR UPDATE")).First(&order, "id = ?", orderID).Error; err != nil {
			return err
		}

		if order.Version != version {
			return ErrConcurrencyConflict
		}

		if err := state_machine.ValidateTransition(order.Status, newStatus); err != nil {
			return err
		}

		// Update status and increment version
		result := tx.Model(&order).
			Where("id = ? AND version = ?", orderID, version).
			Updates(map[string]interface{}{
				"status":     newStatus,
				"version":    gorm.Expr("version + 1"),
				"updated_at": gorm.Expr("NOW()"),
			})

		if result.Error != nil {
			return result.Error
		}

		if result.RowsAffected == 0 {
			return ErrConcurrencyConflict
		}

		return nil
	})

	if err != nil {
		return nil, err
	}

	return &order, nil
}

func (r *orderRepository) AcceptOrder(ctx context.Context, orderID uuid.UUID, driverID uuid.UUID, version int) (*models.Order, error) {
	var order models.Order
	err := r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Clauses(gorm.Expr("FOR UPDATE")).First(&order, "id = ?", orderID).Error; err != nil {
			return err
		}

		if order.Status != models.StatusPending {
			return errors.New("order is no longer available")
		}

		if order.DriverID != nil {
			return errors.New("order already accepted by another driver")
		}

		if order.Version != version {
			return ErrConcurrencyConflict
		}

		// Update driver and status
		result := tx.Model(&order).
			Where("id = ? AND version = ?", orderID, version).
			Updates(map[string]interface{}{
				"driver_id":  driverID,
				"status":     models.StatusConfirmed,
				"version":    gorm.Expr("version + 1"),
				"updated_at": gorm.Expr("NOW()"),
			})

		if result.Error != nil {
			return result.Error
		}

		if result.RowsAffected == 0 {
			return ErrConcurrencyConflict
		}

		return nil
	})

	if err != nil {
		return nil, err
	}

	return &order, nil
}
