I'll create a comprehensive `api-integration.md` file for the Bizone project:

# `docs/api-integration.md`

```markdown
# Bizone - API Integration Guide

## Overview

Bizone provides a comprehensive REST API for integrating with external services, building custom applications, and automating business workflows. This guide covers API authentication, endpoints, webhooks, and integration examples.

## Base URLs

```bash
# Production
https://api.bizone.ng/v1

# Staging
https://staging-api.bizone.ng/v1

# Development
http://localhost:3000/api
```

## Authentication

### JWT Bearer Tokens
All API requests require a JWT token in the Authorization header.

```http
Authorization: Bearer your_jwt_token_here
```

### Obtaining Access Tokens

#### Business Login
```http
POST /auth/business/login
Content-Type: application/json

{
  "email": "business@example.com",
  "password": "your_password"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "business_123",
      "email": "business@example.com",
      "name": "My Business",
      "role": "business_owner",
      "businessId": "biz_123"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

#### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "your_refresh_token"
}
```

#### API Key Authentication (For Server-to-Server)
```http
X-API-Key: your_api_key_here
```

## Core API Endpoints

### Business Management

#### Get Business Profile
```http
GET /business/profile
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "biz_123",
    "name": "My Retail Store",
    "type": "retail",
    "email": "business@example.com",
    "phone": "+2348000000000",
    "address": {
      "street": "123 Business Street",
      "city": "Lagos",
      "state": "Lagos",
      "country": "Nigeria",
      "postalCode": "100001"
    },
    "settings": {
      "currency": "NGN",
      "timezone": "Africa/Lagos",
      "language": "en",
      "notificationPreferences": {
        "email": true,
        "sms": true,
        "push": true
      }
    },
    "subscription": {
      "plan": "premium",
      "status": "active",
      "expiresAt": "2024-12-31T23:59:59Z"
    },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Update Business Profile
```http
PATCH /business/profile
Content-Type: application/json

{
  "name": "Updated Business Name",
  "phone": "+2348000000001",
  "address": {
    "street": "124 Updated Street",
    "city": "Abuja"
  }
}
```

### Product Management

#### List Products
```http
GET /products?page=1&limit=20&category=electronics&search=iphone&inStock=true
```

Query Parameters:
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20, max: 100)
- `category` (string): Filter by category
- `search` (string): Search in product name and description
- `inStock` (boolean): Only in-stock products
- `status` (string): Product status (active, inactive, draft)
- `sortBy` (string): Sort field (name, price, createdAt, updatedAt)
- `sortOrder` (string): Sort order (asc, desc)

Response:
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "prod_123",
        "name": "iPhone 14 Pro",
        "description": "Latest Apple smartphone with advanced camera",
        "sku": "APPLE-IP14P-256",
        "price": 750000,
        "comparePrice": 800000,
        "costPrice": 650000,
        "currency": "NGN",
        "stock": 15,
        "lowStockAlert": 5,
        "category": "electronics",
        "tags": ["smartphone", "apple", "premium"],
        "images": [
          "https://res.cloudinary.com/your-cloud/image/upload/v1/products/iphone14pro-1.jpg",
          "https://res.cloudinary.com/your-cloud/image/upload/v1/products/iphone14pro-2.jpg"
        ],
        "variants": [
          {
            "id": "var_123",
            "name": "128GB",
            "price": 750000,
            "stock": 10
          },
          {
            "id": "var_124",
            "name": "256GB",
            "price": 850000,
            "stock": 5
          }
        ],
        "status": "active",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-20T14:25:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### Get Single Product
```http
GET /products/prod_123
```

#### Create Product
```http
POST /products
Content-Type: application/json

{
  "name": "Samsung Galaxy S23",
  "description": "Premium Android smartphone",
  "sku": "SAMSUNG-GS23-256",
  "price": 650000,
  "comparePrice": 700000,
  "costPrice": 550000,
  "currency": "NGN",
  "stock": 25,
  "lowStockAlert": 10,
  "category": "electronics",
  "tags": ["android", "samsung", "premium"],
  "images": ["https://example.com/galaxy-s23.jpg"],
  "variants": [
    {
      "name": "128GB",
      "price": 650000,
      "stock": 15
    },
    {
      "name": "256GB",
      "price": 750000,
      "stock": 10
    }
  ]
}
```

#### Update Product
```http
PATCH /products/prod_123
Content-Type: application/json

{
  "price": 680000,
  "stock": 20,
  "description": "Updated description with new features"
}
```

#### Delete Product
```http
DELETE /products/prod_123
```

### Order Management

#### List Orders
```http
GET /orders?page=1&limit=20&status=processing&customerId=cust_123
```

Query Parameters:
- `status` (string): Order status (pending, confirmed, processing, shipped, delivered, cancelled)
- `customerId` (string): Filter by customer
- `dateFrom` (string): Filter orders from date (YYYY-MM-DD)
- `dateTo` (string): Filter orders to date (YYYY-MM-DD)

Response:
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "order_123",
        "orderNumber": "ORD-001234",
        "customerId": "cust_123",
        "customer": {
          "name": "John Doe",
          "email": "john@example.com",
          "phone": "+2348000000000"
        },
        "items": [
          {
            "productId": "prod_123",
            "productName": "iPhone 14 Pro",
            "variantId": "var_123",
            "variantName": "128GB",
            "quantity": 1,
            "unitPrice": 750000,
            "totalPrice": 750000
          }
        ],
        "subtotal": 750000,
        "shippingFee": 1500,
        "discount": 0,
        "tax": 112500,
        "total": 863500,
        "currency": "NGN",
        "status": "processing",
        "paymentStatus": "paid",
        "shippingAddress": {
          "name": "John Doe",
          "street": "123 Customer Street",
          "city": "Lagos",
          "state": "Lagos",
          "country": "Nigeria",
          "postalCode": "100001",
          "phone": "+2348000000000"
        },
        "billingAddress": {
          "sameAsShipping": true
        },
        "notes": "Please deliver before 5 PM",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T11:45:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "pages": 3
    }
  }
}
```

#### Create Order
```http
POST /orders
Content-Type: application/json

{
  "customerId": "cust_123",
  "items": [
    {
      "productId": "prod_123",
      "variantId": "var_123",
      "quantity": 2,
      "unitPrice": 750000
    }
  ],
  "shippingAddress": {
    "name": "Jane Smith",
    "street": "124 Customer Avenue",
    "city": "Abuja",
    "state": "FCT",
    "country": "Nigeria",
    "postalCode": "900001",
    "phone": "+2348000000001"
  },
  "billingAddress": {
    "sameAsShipping": true
  },
  "shippingMethod": "standard",
  "paymentMethod": "card",
  "notes": "Fragile items, handle with care"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "order": {
      "id": "order_124",
      "orderNumber": "ORD-001235",
      "status": "pending",
      "total": 1501500,
      "paymentUrl": "https://paystack.com/pay/order_124"
    }
  }
}
```

#### Update Order Status
```http
PATCH /orders/order_123/status
Content-Type: application/json

{
  "status": "shipped",
  "trackingNumber": "TRK123456789",
  "notes": "Shipped via DHL"
}
```

### Customer Management

#### List Customers
```http
GET /customers?page=1&limit=20&search=john&group=premium
```

Response:
```json
{
  "success": true,
  "data": {
    "customers": [
      {
        "id": "cust_123",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+2348000000000",
        "addresses": [
          {
            "type": "shipping",
            "street": "123 Customer Street",
            "city": "Lagos",
            "state": "Lagos",
            "country": "Nigeria",
            "isDefault": true
          }
        ],
        "totalOrders": 5,
        "totalSpent": 4250000,
        "lastOrderDate": "2024-01-15T10:30:00Z",
        "customerGroup": "premium",
        "notes": "VIP customer",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    }
  }
}
```

#### Create Customer
```http
POST /customers
Content-Type: application/json

{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "phone": "+2348000000002",
  "addresses": [
    {
      "type": "shipping",
      "street": "125 New Customer Road",
      "city": "Port Harcourt",
      "state": "Rivers",
      "country": "Nigeria",
      "isDefault": true
    }
  ],
  "customerGroup": "regular",
  "notes": "New customer from website"
}
```

### Inventory Management

#### Get Inventory Levels
```http
GET /inventory?lowStock=true
```

Response:
```json
{
  "success": true,
  "data": {
    "inventory": [
      {
        "productId": "prod_123",
        "productName": "iPhone 14 Pro",
        "sku": "APPLE-IP14P-256",
        "currentStock": 5,
        "lowStockAlert": 10,
        "status": "low_stock",
        "lastRestocked": "2024-01-10T09:00:00Z",
        "nextRestockDate": "2024-01-25T00:00:00Z"
      }
    ]
  }
}
```

#### Update Inventory
```http
POST /inventory/prod_123/adjust
Content-Type: application/json

{
  "adjustment": 25,
  "reason": "restock_from_supplier",
  "notes": "Received new shipment from supplier"
}
```

### Analytics & Reports

#### Sales Report
```http
GET /analytics/sales?startDate=2024-01-01&endDate=2024-01-31&groupBy=day
```

Response:
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalRevenue": 24500000,
      "totalOrders": 124,
      "averageOrderValue": 197580,
      "conversionRate": 3.2
    },
    "dailyData": [
      {
        "date": "2024-01-01",
        "revenue": 750000,
        "orders": 4,
        "customers": 3
      }
    ],
    "topProducts": [
      {
        "productId": "prod_123",
        "productName": "iPhone 14 Pro",
        "quantitySold": 25,
        "revenue": 18750000
      }
    ]
  }
}
```

## Payment Integration

### Paystack Payment Flow

#### Initialize Payment
```http
POST /payments/initialize
Content-Type: application/json

{
  "orderId": "order_123",
  "amount": 863500,
  "email": "customer@example.com",
  "callbackUrl": "https://yourapp.com/payment/callback",
  "metadata": {
    "orderNumber": "ORD-001234",
    "customerName": "John Doe"
  }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "authorizationUrl": "https://paystack.com/pay/authorization_code",
    "accessCode": "access_code_123",
    "reference": "payment_ref_123"
  }
}
```

#### Verify Payment
```http
GET /payments/verify/payment_ref_123
```

Response:
```json
{
  "success": true,
  "data": {
    "reference": "payment_ref_123",
    "amount": 863500,
    "currency": "NGN",
    "status": "success",
    "gatewayResponse": "Approved",
    "paidAt": "2024-01-15T11:30:00Z",
    "orderId": "order_123"
  }
}
```

### Payment Webhooks

#### Paystack Webhook
```http
POST /webhooks/paystack
Content-Type: application/json
X-Paystack-Signature: signature_hash

{
  "event": "charge.success",
  "data": {
    "id": 123456789,
    "reference": "payment_ref_123",
    "amount": 863500,
    "currency": "NGN",
    "status": "success",
    "gateway_response": "Approved",
    "paid_at": "2024-01-15T11:30:00Z",
    "metadata": {
      "orderId": "order_123"
    },
    "customer": {
      "email": "customer@example.com"
    }
  }
}
```

## Delivery & Logistics

### Create Delivery
```http
POST /deliveries
Content-Type: application/json

{
  "orderId": "order_123",
  "pickupAddress": {
    "name": "My Business",
    "street": "123 Business Street",
    "city": "Lagos",
    "state": "Lagos",
    "phone": "+2348000000000"
  },
  "deliveryAddress": {
    "name": "John Doe",
    "street": "123 Customer Street",
    "city": "Lagos",
    "state": "Lagos",
    "phone": "+2348000000000"
  },
  "package": {
    "weight": 0.5,
    "dimensions": "20x15x10",
    "description": "iPhone 14 Pro"
  },
  "deliveryType": "express",
  "notes": "Fragile item"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "deliveryId": "del_123",
    "trackingNumber": "TRK123456789",
    "trackingUrl": "https://tracking.bizone.ng/TRK123456789",
    "estimatedDelivery": "2024-01-16T15:00:00Z",
    "cost": 1500
  }
}
```

### Track Delivery
```http
GET /deliveries/del_123/tracking
```

Response:
```json
{
  "success": true,
  "data": {
    "deliveryId": "del_123",
    "status": "in_transit",
    "trackingNumber": "TRK123456789",
    "currentLocation": "Lagos Distribution Center",
    "updates": [
      {
        "timestamp": "2024-01-15T14:30:00Z",
        "status": "picked_up",
        "location": "Lagos Warehouse",
        "description": "Package picked up from sender"
      },
      {
        "timestamp": "2024-01-15T16:45:00Z",
        "status": "in_transit",
        "location": "Lagos Distribution Center",
        "description": "Package in transit to destination"
      }
    ],
    "estimatedDelivery": "2024-01-16T15:00:00Z"
  }
}
```

## WhatsApp Business API Integration

### Send Message
```http
POST /whatsapp/messages
Content-Type: application/json

{
  "to": "+2348000000000",
  "type": "template",
  "template": {
    "name": "order_confirmation",
    "language": "en",
    "components": [
      {
        "type": "body",
        "parameters": [
          {"type": "text", "text": "ORD-001234"},
          {"type": "text", "text": "John Doe"},
          {"type": "text", "text": "₦863,500"}
        ]
      },
      {
        "type": "button",
        "sub_type": "url",
        "index": 0,
        "parameters": [
          {"type": "text", "text": "TRK123456789"}
        ]
      }
    ]
  }
}
```

### Receive Messages (Webhook)
```http
POST /webhooks/whatsapp
Content-Type: application/json

{
  "object": "whatsapp_business_account",
  "entry": [{
    "id": "WHATSAPP_BUSINESS_ACCOUNT_ID",
    "changes": [{
      "value": {
        "messaging_product": "whatsapp",
        "metadata": {
          "display_phone_number": "123456789",
          "phone_number_id": "PHONE_NUMBER_ID"
        },
        "contacts": [{
          "profile": {
            "name": "John Doe"
          },
          "wa_id": "2348000000000"
        }],
        "messages": [{
          "from": "2348000000000",
          "id": "wamid.ID",
          "timestamp": "1705317973",
          "text": {
            "body": "Hello, I want to track my order"
          },
          "type": "text"
        }]
      },
      "field": "messages"
    }]
  }]
}
```

## Webhooks

### Subscribe to Webhooks
```http
POST /webhooks/subscribe
Content-Type: application/json

{
  "url": "https://yourapp.com/webhooks/bizone",
  "events": [
    "order.created",
    "order.updated",
    "payment.completed",
    "delivery.shipped",
    "delivery.delivered"
  ],
  "secret": "your_webhook_secret"
}
```

### Webhook Events

#### Order Created
```json
{
  "event": "order.created",
  "data": {
    "orderId": "order_123",
    "orderNumber": "ORD-001234",
    "customer": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "total": 863500,
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### Payment Completed
```json
{
  "event": "payment.completed",
  "data": {
    "orderId": "order_123",
    "paymentReference": "payment_ref_123",
    "amount": 863500,
    "currency": "NGN",
    "status": "success",
    "paidAt": "2024-01-15T11:30:00Z"
  },
  "timestamp": "2024-01-15T11:30:00Z"
}
```

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      },
      {
        "field": "price",
        "message": "Price must be greater than 0"
      }
    ],
    "traceId": "trace_123456789"
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `AUTH_REQUIRED` | 401 | Authentication required |
| `INVALID_TOKEN` | 401 | Invalid or expired token |
| `PERMISSION_DENIED` | 403 | Insufficient permissions |
| `VALIDATION_ERROR` | 400 | Invalid input data |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Internal server error |

## Rate Limiting

### Rate Limits
- **General API**: 1000 requests per hour per API key
- **Authentication**: 10 requests per minute per IP
- **Payment API**: 100 requests per hour per business
- **WhatsApp API**: 1000 messages per day per business

### Rate Limit Headers
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1705317973
Retry-After: 60
```

## SDK and Client Libraries

### JavaScript/TypeScript SDK
```bash
npm install @bizone/sdk
```

```typescript
import { BizoneClient } from '@bizone/sdk';

// Initialize client
const client = new BizoneClient({
  apiKey: 'your_api_key',
  environment: 'production', // or 'staging', 'development'
  timeout: 30000
});

// Usage examples
const products = await client.products.list({ page: 1, limit: 20 });
const order = await client.orders.create(orderData);
const customer = await client.customers.get('cust_123');
```

### Webhook Verification
```typescript
import { verifyWebhook } from '@bizone/sdk';

app.post('/webhooks/bizone', (req, res) => {
  const signature = req.headers['x-bizone-signature'];
  const payload = req.body;
  
  if (verifyWebhook(payload, signature, process.env.WEBHOOK_SECRET)) {
    // Process webhook
    switch (payload.event) {
      case 'order.created':
        handleOrderCreated(payload.data);
        break;
      case 'payment.completed':
        handlePaymentCompleted(payload.data);
        break;
    }
    res.status(200).send('OK');
  } else {
    res.status(401).send('Invalid signature');
  }
});
```

## Testing and Development

### Using Mock Data
```bash
# Enable test mode
curl -H "X-Test-Mode: true" https://api.bizone.ng/v1/orders
```

### Postman Collection
Import our Postman collection for easy testing:
```bash
# Download collection
curl -o bizone-postman-collection.json https://docs.bizone.ng/postman-collection.json
```

### Testing Webhooks with ngrok
```bash
# Install ngrok
npm install -g ngrok

# Expose local server
ngrok http 3000

# Update webhook URL in dashboard to use ngrok URL
```

## Best Practices

### 1. Error Handling
```javascript
try {
  const response = await bizone.orders.create(orderData);
  if (!response.success) {
    throw new Error(response.error.message);
  }
  return response.data;
} catch (error) {
  console.error('API Error:', error);
  // Implement retry logic or user notification
}
```

### 2. Retry Logic with Exponential Backoff
```javascript
async function apiCallWithRetry(apiCall, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      if (error.code === 'RATE_LIMITED') {
        const retryAfter = error.headers['retry-after'] || Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        continue;
      }
      if (attempt === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
    }
  }
}
```

### 3. Request Logging
```javascript
// Add request/response logging
client.interceptors.request.use(request => {
  console.log('Outgoing Request:', {
    method: request.method,
    url: request.url,
    headers: request.headers,
    data: request.data
  });
  return request;
});

client.interceptors.response.use(response => {
  console.log('Incoming Response:', {
    status: response.status,
    data: response.data
  });
  return response;
});
```

### 4. Pagination Handling
```javascript
async function getAllPages(endpoint, params = {}) {
  let allData = [];
  let page = 1;
  let hasNext = true;

  while (hasNext) {
    const response = await client.get(endpoint, {
      ...params,
      page,
      limit: 100
    });
    
    allData = allData.concat(response.data.items);
    hasNext = response.data.pagination.hasNext;
    page++;
  }

  return allData;
}
```

## Support and Resources

- **API Documentation**: [https://docs.bizone.ng/api](https://docs.bizone.ng/api)
- **Status Page**: [https://status.bizone.ng](https://status.bizone.ng)
- **Support Email**: api-support@bizone.ng
- **Community Forum**: [https://community.bizone.ng](https://community.bizone.ng)
- **GitHub Repository**: [https://github.com/bizone/api-examples](https://github.com/bizone/api-examples)

## Changelog

### v1.2.0 (2024-01-15)
- Added bulk operations for products and orders
- Enhanced webhook security with signature verification
- Added rate limiting headers

### v1.1.0 (2024-01-01)
- Initial API release
- Core business management endpoints
- Payment integration with Paystack

---

**Need Help?** Contact our API support team at api-support@bizone.ng or create an issue in our GitHub repository.
```

This comprehensive API integration guide includes:

1. **Complete API Reference** with all endpoints
2. **Authentication methods** (JWT, API keys)
3. **Detailed request/response examples**
4. **Payment integration** with Paystack
5. **WhatsApp Business API integration**
6. **Webhook setup and examples**
7. **Error handling and rate limiting**
8. **SDK usage and best practices**
9. **Testing and development tools**
10. **Support resources and changelog**

The guide provides everything needed to integrate with the Bizone platform effectively.