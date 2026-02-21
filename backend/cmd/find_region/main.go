package main

import (
	"context"
	"fmt"
	"net/url"

	"github.com/jackc/pgx/v5"
)

func main() {
	projectRef := "mjeesrfarsigyabmunoj"
	password := "supritkumar#123"

	regions := []string{
		"us-east-1",
		"ap-south-1",
		"ap-southeast-1",
		"eu-central-1",
		"us-west-1",
	}

	ctx := context.Background()

	for _, region := range regions {
		host := fmt.Sprintf("aws-0-%s.pooler.supabase.com", region)

		// Build URL safely using net/url to properly encode the password
		u := &url.URL{
			Scheme: "postgres",
			User:   url.UserPassword("postgres."+projectRef, password),
			Host:   host + ":6543",
			Path:   "/postgres",
		}
		q := u.Query()
		q.Set("sslmode", "require")
		q.Set("connect_timeout", "5")
		u.RawQuery = q.Encode()

		connStr := u.String()
		conn, err := pgx.Connect(ctx, connStr)
		if err != nil {
			fmt.Printf("❌ %s — %v\n", region, err)
			continue
		}
		var result string
		err = conn.QueryRow(ctx, "SELECT version()").Scan(&result)
		conn.Close(ctx)
		if err != nil {
			fmt.Printf("❌ %s — query error: %v\n", region, err)
		} else {
			fmt.Printf("✅ %s — CONNECTED!\n", region)
		}
	}
}
