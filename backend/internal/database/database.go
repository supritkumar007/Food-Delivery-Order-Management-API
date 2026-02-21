package database

import (
	"time"

	"github.com/rs/zerolog/log"
	"github.com/yourusername/swiftbite/internal/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func InitDB(cfg *config.Config) {
	var err error
	DB, err = gorm.Open(postgres.Open(cfg.DatabaseURL), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal().Err(err).Msg("Failed to connect to database")
	}

	sqlDB, err := DB.DB()
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to get generic database object")
	}

	// Set connection pooling
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	log.Info().Msg("Database connection established")
}
