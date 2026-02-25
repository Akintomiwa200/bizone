# WhatsApp Integration Setup Guide

This guide explains how to set up the Meta WhatsApp Business API for the Bizone Agri-Trade platform.

## Prerequisites
1. A Facebook Business Manager Account.
2. A registered WhatsApp phone number (must receive SMS/calls for verification).
3. Meta Developer Account at [developers.facebook.com](https://developers.facebook.com/).

## Step 1: Create a Meta App
1. Go to **My Apps** -> **Create App**.
2. Select **Business** type.
3. Fill in App Name (e.g., "Bizone WhatsApp") and associate it with your Business Manager Account.

## Step 2: Add the WhatsApp Product
1. Once the app is created, scroll down to **Add Products to Your App**.
2. Click **Set Up** under WhatsApp.
3. Meta will provide you with a temporary access token and a Test Phone Number.

## Step 3: Configure Environment Variables
Copy these values into your \`backend/.env\` file:
\`\`\`env
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id_here
WHATSAPP_ACCESS_TOKEN=your_permanent_access_token_here
WHATSAPP_VERIFY_TOKEN=your_custom_verify_token_secure_string
\`\`\`

## Step 4: Configure Webhooks
The webhook is how Meta tells our backend about incoming messages.
1. In the Meta Dashboard, go to **WhatsApp** -> **Configuration**.
2. Click **Edit** under Webhook.
3. **Callback URL**: \`https://yourdomain.com/api/whatsapp/webhook\`
4. **Verify Token**: Enter the same token from your \`.env\` file (\`WHATSAPP_VERIFY_TOKEN\`).
5. Click **Verify and Save**.

## Step 5: Subscribe to Webhook Fields
1. After verifying the webhook, click **Manage** under webhook fields.
2. Subscribe to:
   - \`messages\` (critical for knowing when someone texts you)
   - \`message_template_status_update\`

## Step 6: Go Live
1. Generate a **Permanent Access Token** via Business Settings -> System Users -> Generate Token (Ensure \`whatsapp_business_messaging\`, \`whatsapp_business_management\` permissions).
2. Add your real business phone number in the Meta Dashboard and complete the display name verification.
3. Switch your app mode from **Development** to **Live**.

Your Bizone Agri-Trade platform is now fully connected to WhatsApp!
