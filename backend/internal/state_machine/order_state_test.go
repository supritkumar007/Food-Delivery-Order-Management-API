package state_machine

import (
	"testing"

	"github.com/yourusername/swiftbite/internal/models"
)

func TestValidateTransition(t *testing.T) {
	tests := []struct {
		name    string
		current models.OrderStatus
		next    models.OrderStatus
		wantErr bool
	}{
		{"Pending to Confirmed", models.StatusPending, models.StatusConfirmed, false},
		{"Pending to Cancelled", models.StatusPending, models.StatusCancelled, false},
		{"Confirmed to Preparing", models.StatusConfirmed, models.StatusPreparing, false},
		{"Preparing to Ready", models.StatusPreparing, models.StatusReady, false},
		{"Ready to PickedUp", models.StatusReady, models.StatusPickedUp, false},
		{"PickedUp to Delivered", models.StatusPickedUp, models.StatusDelivered, false},
		
		{"Invalid: Pending to Ready", models.StatusPending, models.StatusReady, true},
		{"Invalid: Delivered to Pending", models.StatusDelivered, models.StatusPending, true},
		{"Invalid: Cancelled to Confirmed", models.StatusCancelled, models.StatusConfirmed, true},
		{"Invalid: PickedUp to Cancelled", models.StatusPickedUp, models.StatusCancelled, true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := ValidateTransition(tt.current, tt.next)
			if (err != nil) != tt.wantErr {
				t.Errorf("ValidateTransition() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
