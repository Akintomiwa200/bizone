# BizOne WhatsApp Business Integration Setup Guide

## Overview

BizOne uses a **WhatsApp-first approach** where users interact primarily through WhatsApp for all operations:
- Account creation and setup
- Product listing and management
- Order placement and tracking
- Payments and deposits
- Delivery coordination

The web dashboard is used mainly for viewing analytics, managing settings, and monitoring operations.

---

## 1. WhatsApp Business API Setup

### Step 1: Create Meta Business Account

1. Go to [Meta Business Suite](https://business.facebook.com/)
2. Create a Business Account or use an existing one
3. Verify your business (required for production)

### Step 2: Set Up WhatsApp Business Platform

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create a new App or use existing
3. Add **WhatsApp** product to your app
4. Configure WhatsApp Business Account (WABA):
   - Go to WhatsApp > Getting Started
   - Select or create a WhatsApp Business Account
   - Add a phone number (this will be your business number)

### Step 3: Get API Credentials

After setup, you'll get:

| Credential | Description | Where to find |
|------------|-------------|----------------|
| `WHATSAPP_PHONE_NUMBER_ID` | ID of your business phone number | WhatsApp > Configuration > Phone Number ID |
| `WHATSAPP_ACCESS_TOKEN` | Temporary or permanent access token | WhatsApp > Configuration > Generate Access Token |
| `WHATSAPP_APP_ID` | Your Meta App ID | App Dashboard > Settings > Basic |
| `WHATSAPP_APP_SECRET` | App Secret for webhook verification | App Dashboard > Settings > Basic |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | Your WABA ID | WhatsApp > Configuration |

---

## 2. Configure Environment Variables

Update `/home/Herkintormiwer/Desktop/bizone/backend/.env`:

```bash
# WhatsApp Business API Configuration
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
WHATSAPP_ACCESS_TOKEN=your_access_token_here
WHATSAPP_VERIFY_TOKEN=bizone_verify_token_12345
WHATSAPP_WEBHOOK_URL=https://your-domain.com/api/whatsapp/webhook
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_APP_ID=your_app_id
WHATSAPP_APP_SECRET=your_app_secret
```

**Important**: 
- `WHATSAPP_VERIFY_TOKEN` - Choose a strong random string, you'll need this when setting up webhook
- For development, use ngrok or similar to expose your local server

---

## 3. Webhook Configuration

### Step 1: Start Your Server

```bash
cd /home/Herkintormiwer/Desktop/bizone/backend
pnpm dev
```

### Step 2: Expose Local Server (Development)

Use ngrok to get a public URL:

```bash
ngrok http 5000
```

Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)

### Step 3: Configure Webhook in Meta Dashboard

1. Go to Meta Developer Portal > Your App > WhatsApp > Configuration
2. Click **Edit** next to Webhook
3. Enter webhook URL: `https://your-domain.com/api/whatsapp/webhook`
4. Enter Verify Token: The value of `WHATSAPP_VERIFY_TOKEN` from your `.env`
5. Select subscription fields:
   - ✅ `messages`
   - ✅ `message_status_updates`
6. Click **Verify and Save**

---

## 4. WhatsApp Bot Capabilities

The BizOne WhatsApp bot (`whatsappBotService.js`) supports these operations:

### Account Management
```
User: "hi" or "hello"
Bot:  "Welcome to BizOne! Are you a Farmer, Buyer, or Delivery?"
User: "Farmer"
Bot:  "Great! Please share your location to start listing products."
```

### Product Management (Farmers)
```
User: "sell yam for 5000 per bag"
Bot:  "Product added! Yam listed at ₦5,000 per bag. Location: [your location]"

User: "my products"
Bot:  "Here are your products:\n1. Yam - ₦5,000 - In stock\n2. Cassava - ₦2,000 - In stock"
```

### Order Management (Buyers)
```
User: "buy yam within 10km"
Bot:  "Found 3 yam sellers near you:\n1. Farmer John - ₦5,000 - 5km away\n2. Farmer Mary - ₦5,500 - 8km away"

User: "offer 4500 for yam 1"
Bot:  "Offer sent to Farmer John: ₦4,500 for Yam. Waiting for response..."

Farmer receives: "New offer: ₦4,500 for Yam from Buyer123"
Farmer: "accept offer 1"
Bot:  "Offer accepted! Order ORD-001 created. Delivery will be arranged."
```

### Payment & Wallet
```
User: "check balance"
Bot:  "Your wallet balance: ₦25,000"

User: "deposit 10000"
Bot:  "Please pay ₦10,000 to [payment link]. Your wallet will be credited instantly."
```

### Delivery Tracking
```
User: "track order ORD-001"
Bot:  "Order ORD-001 Status: Out for Delivery\nRider: John (08012345678)\nETA: 15 minutes"
```

---

## 5. Testing the Integration

### Test Incoming Messages

1. Add your business phone number to your WhatsApp contacts
2. Send "hi" to start the conversation
3. Follow the bot prompts

### Test Webhook

```bash
# Test webhook verification
curl "http://localhost:5000/api/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=your_verify_token&hub.challenge=test123"

# Should return: test123
```

### Test Sending Messages (from dashboard)

1. Login to dashboard at `http://localhost:3000`
2. Go to WhatsApp AI Dashboard
3. Select a conversation
4. Send a message - it should appear on the user's WhatsApp

---

## 6. WhatsApp Message Templates

For sending notifications (order updates, payment reminders), you need pre-approved templates.

### Create Template via API

```bash
curl -X POST https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/message_templates \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "order_confirmation",
    "category": "UTILITY",
    "language": "en",
    "components": [
      {
        "type": "BODY",
        "text": "Your order {{1}} has been confirmed. Total: ₦{{2}}. Track: {{3}}"
      }
    ]
  }'
```

### Available Templates in BizOne

| Template Name | Purpose | Parameters |
|--------------|---------|-------------|
| `order_confirmation` | Order confirmed | Order ID, Total, Tracking Link |
| `delivery_update` | Delivery status | Order ID, Status, ETA |
| `payment_reminder` | Payment due | Amount, Due Date |
| `welcome_message` | New user welcome | Name |

---

## 7. WhatsApp Business Management

### View Conversations
- Dashboard: `http://localhost:3000/dashboard/whatsapp-ai`
- Real-time chat interface
- Sentiment analysis
- Automated responses

### Manage Templates
- Dashboard: `http://localhost:3000/dashboard/whatsapp-ai/templates`
- Create new templates
- Edit existing templates
- Delete unused templates

### Automation Rules
- Dashboard: `http://localhost:3000/dashboard/whatsapp-ai/automation`
- Set auto-replies
- Configure AI responses
- Set business hours

### Analytics
- Dashboard: `http://localhost:3000/dashboard/whatsapp-ai/analytics`
- Message volume
- Response times
- Customer satisfaction

---

## 8. Production Checklist

Before going live:

- [ ] WhatsApp Business Account verified
- [ ] Production access token (not temporary)
- [ ] Webhook URL uses HTTPS
- [ ] Phone number is active and reachable
- [ ] Message templates approved by Meta
- [ ] Tested all user flows (signup, orders, payments)
- [ ] Error handling and fallbacks in place
- [ ] Rate limiting configured
- [ ] Monitoring and logging enabled

---

## 9. Troubleshooting

### Webhook Verification Failed
```
Error: Webhook verification failed
```
**Solution**: Check that `WHATSAPP_VERIFY_TOKEN` in `.env` matches what you entered in Meta dashboard.

### Messages Not Received
```
Issue: User sends message but nothing happens
```
**Solution**: 
1. Check webhook is configured correctly
2. Verify `WHATSAPP_APP_SECRET` is correct
3. Check server logs: `tail -f logs/backend.log`

### Cannot Send Messages
```
Error: (401) Unauthorized
```
**Solution**: 
1. Verify `WHATSAPP_ACCESS_TOKEN` is valid
2. Token may be expired - generate a new one
3. Check `WHATSAPP_PHONE_NUMBER_ID` is correct

### Bot Not Responding
```
Issue: Messages received but no bot response
```
**Solution**:
1. Check `whatsappBotService.js` is running
2. Verify `commandParser.js` recognizes the command
3. Check MongoDB connection (chat history is saved)

---

## 10. Support

For issues with:
- **Meta/WhatsApp API**: Visit [Meta Business Help Center](https://www.facebook.com/business/help)
- **BizOne Integration**: Check backend logs or open issue in repository
- **Bot Logic**: Review `/backend/services/whatsappBotService.js`

---

## Quick Reference

### Environment Variables (.env)
```bash
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
WHATSAPP_PHONE_NUMBER_ID=1234567890
WHATSAPP_ACCESS_TOKEN=EAAG...
WHATSAPP_VERIFY_TOKEN=your_secure_token_here
WHATSAPP_WEBHOOK_URL=https://your-domain.com/api/whatsapp/webhook
WHATSAPP_BUSINESS_ACCOUNT_ID=9876543210
WHATSAPP_APP_ID=1122334455
WHATSAPP_APP_SECRET=abc123...
```

### API Endpoints
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/whatsapp/webhook` | GET | Webhook verification |
| `/api/whatsapp/webhook` | POST | Receive messages |
| `/api/whatsapp/messages` | POST | Send message |
| `/api/whatsapp/messages` | GET | Get messages |
| `/api/whatsapp/contacts` | GET | List contacts |
| `/api/whatsapp/templates` | GET | Get templates |

### Dashboard Pages
| Page | URL |
|------|-----|
| WhatsApp Chat | `/dashboard/whatsapp-ai` |
| Templates | `/dashboard/whatsapp-ai/templates` |
| Automation | `/dashboard/whatsapp-ai/automation` |
| Analytics | `/dashboard/whatsapp-ai/analytics` |
