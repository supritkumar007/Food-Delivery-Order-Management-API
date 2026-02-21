package services

import (
	"context"

	"github.com/google/uuid"
	"github.com/yourusername/swiftbite/internal/models"
	"github.com/yourusername/swiftbite/internal/repositories"
)

type AddressService struct {
	repo *repositories.AddressRepository
}

func NewAddressService(repo *repositories.AddressRepository) *AddressService {
	return &AddressService{repo: repo}
}

func (s *AddressService) GetAddresses(ctx context.Context, userID uuid.UUID) ([]models.Address, error) {
	return s.repo.GetByUserID(ctx, userID)
}

func (s *AddressService) CreateAddress(ctx context.Context, addr *models.Address) error {
	return s.repo.Create(ctx, addr)
}

func (s *AddressService) DeleteAddress(ctx context.Context, id uuid.UUID, userID uuid.UUID) error {
	return s.repo.Delete(ctx, id, userID)
}
