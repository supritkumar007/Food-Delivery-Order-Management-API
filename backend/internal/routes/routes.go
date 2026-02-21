package routes

import (
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/contrib/websocket"
	"github.com/yourusername/swiftbite/internal/handlers"
	"github.com/yourusername/swiftbite/internal/middleware"
	"github.com/yourusername/swiftbite/internal/config"
	"github.com/yourusername/swiftbite/internal/sockets"
)

func SetupRoutes(app *fiber.App, cfg *config.Config, orderHandler *handlers.OrderHandler) {
	// Public routes
	app.Get("/health", func(c fiber.Ctx) error {
		return c.SendString("OK")
	})

	// Protected routes
	api := app.Group("/api", middleware.AuthMiddleware(cfg))

	// Order routes
	orders := api.Group("/orders")
	orders.Get("/:id", orderHandler.GetOrder)
	orders.Patch("/:id/status", orderHandler.UpdateStatus)
	orders.Post("/:id/accept", middleware.RoleMiddleware("DRIVER"), orderHandler.AcceptOrder)

	// WebSocket route
	app.Get("/ws/orders/:id", websocket.New(func(c *websocket.Conn) {
		orderID := c.Params("id")
		sockets.GlobalHub.Register(orderID, c)
		
		defer func() {
			sockets.GlobalHub.Unregister(orderID, c)
			c.Close()
		}()

		for {
			if _, _, err := c.ReadMessage(); err != nil {
				break
			}
		}
	}))
}
