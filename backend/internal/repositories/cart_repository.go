package repositories

import (
	"context"
	"github.com/google/uuid"
	"github.com/yourusername/swiftbite/internal/models"
	"gorm.io/gorm"
)

type CartRepository struct {
	db *gorm.DB
}

func NewCartRepository(db *gorm.DB) *CartRepository {
	return &CartRepository{db: db}
}

func (r *CartRepository) GetByCustomerID(ctx context.Context, customerID uuid.UUID) (*models.Cart, error) {
	var cart models.Cart
	err := r.db.WithContext(ctx).Preload("Items").Where("customer_id = ?", customerID).First(&cart).Error
	if err == gorm.ErrRecordNotFound {
		// Create a new cart if not exists
		cart = models.Cart{CustomerID: customerID}
		if err := r.db.WithContext(ctx).Create(&cart).Error; err != nil {
			return nil, err
		}
		return &cart, nil
	}
	return &cart, err
}

func (r *CartRepository) AddItem(ctx context.Context, cartID uuid.UUID, itemID uuid.UUID, quantity int) error {
	var item models.CartItem
	err := r.db.WithContext(ctx).Where("cart_id = ? AND menu_item_id = ?", cartID, itemID).First(&item).Error
	if err == gorm.ErrRecordNotFound {
		item = models.CartItem{
			CartID:     cartID,
			MenuItemID: itemID,
			Quantity:   quantity,
		}
		return r.db.WithContext(ctx).Create(&item).Error
	} else if err != nil {
		return err
	}

	item.Quantity += quantity
	return r.db.WithContext(ctx).Save(&item).Error
}

func (r *CartRepository) UpdateItemQuantity(ctx context.Context, cartID uuid.UUID, itemID uuid.UUID, quantity int) error {
	if quantity <= 0 {
		return r.db.WithContext(ctx).Where("cart_id = ? AND menu_item_id = ?", cartID, itemID).Delete(&models.CartItem{}).Error
	}
	return r.db.WithContext(ctx).Model(&models.CartItem{}).
		Where("cart_id = ? AND menu_item_id = ?", cartID, itemID).
		Update("quantity", quantity).Error
}

func (r *CartRepository) ClearCart(ctx context.Context, cartID uuid.UUID) error {
	return r.db.WithContext(ctx).Where("cart_id = ?", cartID).Delete(&models.CartItem{}).Error
}
