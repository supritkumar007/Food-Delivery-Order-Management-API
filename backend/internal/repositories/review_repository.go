package repositories

import (
	"context"
	"github.com/google/uuid"
	"github.com/yourusername/swiftbite/internal/models"
	"gorm.io/gorm"
)

type ReviewRepository struct {
	db *gorm.DB
}

func NewReviewRepository(db *gorm.DB) *ReviewRepository {
	return &ReviewRepository{db: db}
}

func (r *ReviewRepository) Create(ctx context.Context, review *models.Review) error {
	return r.db.WithContext(ctx).Create(review).Error
}

func (r *ReviewRepository) GetByRestaurant(ctx context.Context, restaurantID uuid.UUID) ([]models.Review, error) {
	var reviews []models.Review
	err := r.db.WithContext(ctx).Where("restaurant_id = ? AND review_type = 'RESTAURANT'", restaurantID).Find(&reviews).Error
	return reviews, err
}

func (r *ReviewRepository) GetByDriver(ctx context.Context, driverID uuid.UUID) ([]models.Review, error) {
	var reviews []models.Review
	err := r.db.WithContext(ctx).Where("driver_id = ? AND review_type = 'DRIVER'", driverID).Find(&reviews).Error
	return reviews, err
}
