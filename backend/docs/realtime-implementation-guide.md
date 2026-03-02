# Bizone Realtime Implementation Guide

## Scope
This guide documents the backend realtime implementation for:
- Admin web dashboard live updates
- WhatsApp-driven operational updates
- Order, delivery, payment, and chat events

The implementation uses `socket.io` on the backend and JWT-authenticated socket sessions.

## What Is Implemented

### 1. Authenticated WebSocket Connections
- File: `backend/middleware/socketAuth.js`
- Socket clients must provide JWT (`handshake.auth.token` or `Authorization: Bearer ...`).
- On connect, backend resolves:
  - `socket.data.user`
  - `socket.data.businessId` (business owner mapping)
  - `socket.data.riderId` (rider mapping)

### 2. Secure Room Model
- Auto-joined rooms:
  - `user-{userId}`
  - `business-{businessId}` (if owner has business)
  - `rider-{riderId}` (if rider profile exists)
- Authorized joins:
  - `join-business` only for own business
  - `join-order` only for orders in own business
  - `join-delivery` only for same business or assigned rider

### 3. Unified Realtime Emitter
- File: `backend/services/realtimeService.js`
- Standard event envelope emitted as `realtime:event`:
  - `type`
  - `timestamp`
  - `data`
- Legacy event names are still emitted for compatibility:
  - `new-order`, `order-updated`, `status-changed`, `new_message`, etc.

### 4. Domain Event Wiring
- `controllers/orderController.js`
  - emits `order.created` and `order.updated`
- `controllers/deliveryController.js`
  - emits `delivery.updated` on request/assign/status update
- `controllers/paymentController.js`
  - emits `payment.updated` on verify/webhook success
- `controllers/whatsappController.js`
  - emits outbound WhatsApp message events
- `services/whatsappService.js`
  - emits inbound WhatsApp message events
  - emits WhatsApp status update events

### 5. Missing Core Model Added
- File: `backend/models/Rider.js`
- Required by `deliveryService.js` and secure delivery room authorization.

## Event Contract

All new standardized realtime traffic uses:

```json
{
  "type": "order.created",
  "timestamp": "2026-03-02T10:15:00.000Z",
  "data": {}
}
```

### Current `type` values
- `order.created`
- `order.updated`
- `delivery.updated`
- `payment.updated`
- `whatsapp.message`
- `whatsapp.status`

## Frontend Connection Requirements

Client must connect with auth token:

```ts
io(SOCKET_URL, {
  auth: { token: jwtToken }
})
```

Optional room joins (after connect):
- `join-business(businessId, ack)`
- `join-order(orderId, ack)`
- `join-delivery(deliveryId, ack)`

Each join returns an ACK object:

```json
{ "success": true }
```

or

```json
{ "success": false, "message": "..." }
```

## Environment Checklist

Required:
- `JWT_SECRET`
- `MONGODB_URI`
- `FRONTEND_URL`

Required for WhatsApp:
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_VERIFY_TOKEN`
- `WHATSAPP_BUSINESS_ACCOUNT_ID` (template operations)

## Verification Steps

1. Start backend:
```bash
cd backend
npm run dev
```

2. Connect websocket with valid JWT.
3. Confirm connection joins own `business-*` room automatically.
4. Trigger order creation and verify:
   - `realtime:event` with `type=order.created`
   - legacy `new-order`
5. Update delivery status and verify `delivery.updated`.
6. Complete payment webhook and verify `payment.updated`.
7. Send inbound WhatsApp webhook and verify:
   - `whatsapp.message`
   - `whatsapp.status` on status callbacks.

## Production Hardening Still Recommended

1. Add Socket.IO Redis adapter for multi-instance horizontal scaling.
2. Add webhook signature verification for payment and WhatsApp.
3. Add idempotency keys for webhook/event processing.
4. Add structured event log persistence (Mongo/Kafka) for replay/debug.
5. Add integration tests for websocket auth and room authorization.
6. Add rate-limits specifically for socket event handlers.
