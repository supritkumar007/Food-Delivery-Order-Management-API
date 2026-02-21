package state_machine

import (
	"errors"
	"fmt"

	"github.com/yourusername/swiftbite/internal/models"
)

var (
	ErrInvalidTransition = errors.New("invalid status transition")
)

var validTransitions = map[models.OrderStatus][]models.OrderStatus{
	models.StatusPending:   {models.StatusConfirmed, models.StatusCancelled},
	models.StatusConfirmed: {models.StatusPreparing, models.StatusCancelled},
	models.StatusPreparing: {models.StatusReady, models.StatusCancelled},
	models.StatusReady:     {models.StatusPickedUp},
	models.StatusPickedUp:  {models.StatusDelivered},
	models.StatusDelivered: {},
	models.StatusCancelled: {},
}

func ValidateTransition(current models.OrderStatus, next models.OrderStatus) error {
	allowed, ok := validTransitions[current]
	if !ok {
		return fmt.Errorf("%w: unknown current status %s", ErrInvalidTransition, current)
	}

	for _, s := range allowed {
		if s == next {
			return nil
		}
	}

	return fmt.Errorf("%w: cannot transition from %s to %s", ErrInvalidTransition, current, next)
}
