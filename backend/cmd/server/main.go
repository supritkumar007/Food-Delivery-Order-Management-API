package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/rs/zerolog/log"
	"github.com/yourusername/swiftbite/internal/config"
	"github.com/yourusername/swiftbite/internal/database"
	"github.com/yourusername/swiftbite/internal/handlers"
	"github.com/yourusername/swiftbite/internal/repositories"
	"github.com/yourusername/swiftbite/internal/routes"
	"github.com/yourusername/swiftbite/internal/services"
	pkgLogger "github.com/yourusername/swiftbite/pkg/logger"
)

func main() {
	// Initialize logger
	pkgLogger.InitLogger()

	// Load configuration
	cfg := config.LoadConfig()

	// Initialize database
	database.InitDB(cfg)

	// Setup app
	app := fiber.New(fiber.Config{
		AppName: "SwiftBite Backend GO",
	})

	// Add middleware
	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*", // Adjust for production
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	// Initialize layers
	// Order
	orderRepo := repositories.NewOrderRepository()
	orderService := services.NewOrderService(orderRepo)
	orderHandler := handlers.NewOrderHandler(orderService)

	// Cart
	cartRepo := repositories.NewCartRepository(database.DB)
	cartService := services.NewCartService(cartRepo)
	cartHandler := handlers.NewCartHandler(cartService)

	// Address
	addressRepo := repositories.NewAddressRepository(database.DB)
	addressService := services.NewAddressService(addressRepo)
	addressHandler := handlers.NewAddressHandler(addressService)

	// Payment
	paymentRepo := repositories.NewPaymentRepository(database.DB)
	paymentService := services.NewPaymentService(paymentRepo)
	paymentHandler := handlers.NewPaymentHandler(paymentService)

	// Review
	reviewRepo := repositories.NewReviewRepository(database.DB)
	reviewService := services.NewReviewService(reviewRepo)
	reviewHandler := handlers.NewReviewHandler(reviewService)

	// Setup routes
	routes.SetupRoutes(app, cfg, orderHandler, cartHandler, addressHandler, paymentHandler, reviewHandler)

	// Graceful shutdown
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)

	go func() {
		port := fmt.Sprintf(":%s", cfg.AppPort)
		log.Info().Str("port", port).Msg("Server starting")
		if err := app.Listen(port); err != nil {
			log.Fatal().Err(err).Msg("Server failed to start")
		}
	}()

	<-sigChan
	log.Info().Msg("Gracefully shutting down...")
	if err := app.Shutdown(); err != nil {
		log.Error().Err(err).Msg("Server shutdown error")
	}
	log.Info().Msg("Server stopped")
}
