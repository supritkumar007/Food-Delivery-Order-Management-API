package config

import (
	"os"

	"github.com/joho/godotenv"
	"github.com/rs/zerolog/log"
)

type Config struct {
	AppPort            string
	DatabaseURL        string
	SupabaseJWTSecret  string
	RedisURL           string
}

func LoadConfig() *Config {
	err := godotenv.Load()
	if err != nil {
		log.Warn().Msg("No .env file found, using system environment variables")
	}

	return &Config{
		AppPort:           getEnv("APP_PORT", "8080"),
		DatabaseURL:       getEnv("DATABASE_URL", ""),
		SupabaseJWTSecret: getEnv("SUPABASE_JWT_SECRET", ""),
		RedisURL:          getEnv("REDIS_URL", ""),
	}
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
