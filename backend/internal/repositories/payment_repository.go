package repositories

import (
	"context"
	"github.com/google/uuid"
	"github.com/yourusername/swiftbite/internal/models"
	"gorm.io/gorm"
)

type PaymentRepository struct {
	db *gorm.DB
}

func NewPaymentRepository(db *gorm.DB) *PaymentRepository {
	return &PaymentRepository{db: db}
}

func (r *PaymentRepository) Create(ctx context.Context, p *models.Payment) error {
	return r.db.WithContext(ctx).Create(p).Error
}

func (r *PaymentRepository) GetByOrderID(ctx context.Context, orderID uuid.UUID) (*models.Payment, error) {
	var p models.Payment
	err := r.db.WithContext(ctx).Where("order_id = ?", orderID).First(&p).Error
	return &p, err
}

func (r *PaymentRepository) UpdateStatus(ctx context.Context, id uuid.UUID, status string) error {
	return r.db.WithContext(ctx).Model(&models.Payment{}).Where("id = ?", id).Update("status", status).Error
}
