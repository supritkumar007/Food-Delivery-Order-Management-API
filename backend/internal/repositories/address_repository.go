package repositories

import (
	"context"
	"github.com/google/uuid"
	"github.com/yourusername/swiftbite/internal/models"
	"gorm.io/gorm"
)

type AddressRepository struct {
	db *gorm.DB
}

func NewAddressRepository(db *gorm.DB) *AddressRepository {
	return &AddressRepository{db: db}
}

func (r *AddressRepository) GetByUserID(ctx context.Context, userID uuid.UUID) ([]models.Address, error) {
	var addresses []models.Address
	err := r.db.WithContext(ctx).Where("user_id = ?", userID).Find(&addresses).Error
	return addresses, err
}

func (r *AddressRepository) Create(ctx context.Context, addr *models.Address) error {
	if addr.IsDefault {
		// Reset other defaults
		r.db.WithContext(ctx).Model(&models.Address{}).Where("user_id = ?", addr.UserID).Update("is_default", false)
	}
	return r.db.WithContext(ctx).Create(addr).Error
}

func (r *AddressRepository) Delete(ctx context.Context, id uuid.UUID, userID uuid.UUID) error {
	return r.db.WithContext(ctx).Where("id = ? AND user_id = ?", id, userID).Delete(&models.Address{}).Error
}
