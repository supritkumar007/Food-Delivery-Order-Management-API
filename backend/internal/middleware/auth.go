package middleware

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/rs/zerolog/log"
	"github.com/yourusername/swiftbite/internal/config"
)

func AuthMiddleware(cfg *config.Config) fiber.Handler {
	return func(c *fiber.Ctx) error {
		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Missing authorization header"})
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid authorization header format"})
		}

		tokenString := parts[1]
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(cfg.SupabaseJWTSecret), nil
		})

		if err != nil || !token.Valid {
			log.Error().Err(err).Msg("JWT validation failed")
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid or expired token"})
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token claims"})
		}

		// Extract role and sub (user ID) from Supabase JWT claims
		c.Locals("user_id", claims["sub"])

		// Supabase app_metadata or user_metadata might contain the role
		if appMetadata, ok := claims["app_metadata"].(map[string]interface{}); ok {
			if role, ok := appMetadata["role"].(string); ok {
				c.Locals("role", role)
			}
		}

		return c.Next()
	}
}

func RoleMiddleware(requiredRoles ...string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		roleObj := c.Locals("role")
		if roleObj == nil {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Access denied: role not found"})
		}

		role := roleObj.(string)
		isAuthorized := false
		for _, r := range requiredRoles {
			if role == r {
				isAuthorized = true
				break
			}
		}

		if !isAuthorized {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Access denied: insufficient permissions"})
		}
		return c.Next()
	}
}
