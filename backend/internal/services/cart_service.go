package services

import (
	"context"

	"github.com/google/uuid"
	"github.com/yourusername/swiftbite/internal/models"
	"github.com/yourusername/swiftbite/internal/repositories"
)

type CartService struct {
	repo *repositories.CartRepository
}

func NewCartService(repo *repositories.CartRepository) *CartService {
	return &CartService{repo: repo}
}

func (s *CartService) GetCart(ctx context.Context, customerID uuid.UUID) (*models.Cart, error) {
	return s.repo.GetByCustomerID(ctx, customerID)
}

func (s *CartService) AddToCart(ctx context.Context, customerID uuid.UUID, itemID uuid.UUID, quantity int) error {
	cart, err := s.repo.GetByCustomerID(ctx, customerID)
	if err != nil {
		return err
	}
	return s.repo.AddItem(ctx, cart.ID, itemID, quantity)
}

func (s *CartService) UpdateQuantity(ctx context.Context, customerID uuid.UUID, itemID uuid.UUID, quantity int) error {
	cart, err := s.repo.GetByCustomerID(ctx, customerID)
	if err != nil {
		return err
	}
	return s.repo.UpdateItemQuantity(ctx, cart.ID, itemID, quantity)
}

func (s *CartService) ClearCart(ctx context.Context, customerID uuid.UUID) error {
	cart, err := s.repo.GetByCustomerID(ctx, customerID)
	if err != nil {
		return err
	}
	return s.repo.ClearCart(ctx, cart.ID)
}
