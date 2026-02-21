package services

import (
	"context"

	"github.com/google/uuid"
	"github.com/yourusername/swiftbite/internal/models"
	"github.com/yourusername/swiftbite/internal/repositories"
)

type ReviewService struct {
	repo *repositories.ReviewRepository
}

func NewReviewService(repo *repositories.ReviewRepository) *ReviewService {
	return &ReviewService{repo: repo}
}

func (s *ReviewService) CreateReview(ctx context.Context, review *models.Review) error {
	return s.repo.Create(ctx, review)
}

func (s *ReviewService) GetRestaurantReviews(ctx context.Context, restaurantID uuid.UUID) ([]models.Review, error) {
	return s.repo.GetByRestaurant(ctx, restaurantID)
}
