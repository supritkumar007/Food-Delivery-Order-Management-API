package services

import (
	"context"

	"github.com/google/uuid"
	"github.com/yourusername/swiftbite/internal/models"
	"github.com/yourusername/swiftbite/internal/repositories"
)

type PaymentService struct {
	repo *repositories.PaymentRepository
}

func NewPaymentService(repo *repositories.PaymentRepository) *PaymentService {
	return &PaymentService{repo: repo}
}

func (s *PaymentService) ProcessPayment(ctx context.Context, p *models.Payment) error {
	// Simulate payment processing
	p.Status = "COMPLETED"
	p.TransactionID = "SIM_" + uuid.New().String()
	return s.repo.Create(ctx, p)
}

func (s *PaymentService) GetPaymentByOrder(ctx context.Context, orderID uuid.UUID) (*models.Payment, error) {
	return s.repo.GetByOrderID(ctx, orderID)
}
