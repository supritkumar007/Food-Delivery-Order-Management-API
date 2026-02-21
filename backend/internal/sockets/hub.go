package sockets

import (
	"sync"

	"github.com/gofiber/contrib/websocket"
	"github.com/rs/zerolog/log"
)

type Hub struct {
	// Map of orderID to list of connections (clients watching that order)
	orderConns map[string]map[*websocket.Conn]bool
	mu         sync.RWMutex
}

var GlobalHub = &Hub{
	orderConns: make(map[string]map[*websocket.Conn]bool),
}

func (h *Hub) Register(orderID string, conn *websocket.Conn) {
	h.mu.Lock()
	defer h.mu.Unlock()

	if h.orderConns[orderID] == nil {
		h.orderConns[orderID] = make(map[*websocket.Conn]bool)
	}
	h.orderConns[orderID][conn] = true
	log.Debug().Str("orderID", orderID).Msg("Client connected to order stream")
}

func (h *Hub) Unregister(orderID string, conn *websocket.Conn) {
	h.mu.Lock()
	defer h.mu.Unlock()

	if h.orderConns[orderID] != nil {
		delete(h.orderConns[orderID], conn)
		if len(h.orderConns[orderID]) == 0 {
			delete(h.orderConns, orderID)
		}
	}
	log.Debug().Str("orderID", orderID).Msg("Client disconnected from order stream")
}

func (h *Hub) BroadcastStatusUpdate(orderID string, status string) {
	h.mu.RLock()
	defer h.mu.RUnlock()

	conns, ok := h.orderConns[orderID]
	if !ok {
		return
	}

	payload := map[string]interface{}{
		"order_id": orderID,
		"status":   status,
	}

	for conn := range conns {
		if err := conn.WriteJSON(payload); err != nil {
			log.Error().Err(err).Msg("Failed to broadcast to websocket client")
			conn.Close()
			// Note: Unregistering here is tricky since we have an RLock. 
			// In a high-load system, we'd use a channel-based hub.
		}
	}
}
