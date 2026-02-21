package services

import (
	"context"

	"github.com/google/uuid"
	"github.com/yourusername/swiftbite/internal/models"
	"github.com/yourusername/swiftbite/internal/repositories"
)

type OrderService struct {
	repo repositories.OrderRepository
}

func NewOrderService(repo repositories.OrderRepository) *OrderService {
	return &OrderService{repo: repo}
}

func (s *OrderService) GetOrder(ctx context.Context, id uuid.UUID) (*models.Order, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *OrderService) UpdateOrderStatus(ctx context.Context, orderID uuid.UUID, newStatus models.OrderStatus, version int) (*models.Order, error) {
	return s.repo.UpdateStatus(ctx, orderID, newStatus, version)
}

func (s *OrderService) AcceptOrder(ctx context.Context, orderID uuid.UUID, driverID uuid.UUID, version int) (*models.Order, error) {
	return s.repo.AcceptOrder(ctx, orderID, driverID, version)
}
