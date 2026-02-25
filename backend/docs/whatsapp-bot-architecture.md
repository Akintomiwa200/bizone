# WhatsApp Agricultural Trade Bot Architecture

## Overview
The Bizone Agri-Trade WhatsApp Bot allows Farmers, Buyers, and Delivery personnel to interact via WhatsApp to negotiate and fulfill agricultural trades. It uses NLP for command parsing, MongoDB GeoSpatial queries for location matching, and a state machine to manage active conversations.

## Architecture Components

### 1. Webhook Entry (\`whatsappController.js\` & \`whatsappService.js\`)
All incoming messages from Meta hit the \`/api/whatsapp/webhook\` route. The payload is parsed in \`whatsappService.processWebhook()\`.
After saving the message to the \`Chat\` history collection, it is dynamically routed to the \`whatsappBotService\`.

### 2. Conversational Engine (\`whatsappBotService.js\`)
Acts as the central router for the user.
- **Registration**: If a phone number is not found in the \`Users\` collection, it prompts the user to select a role (Farmer, Buyer, Delivery) and generates a Virtual Wallet Account.
- **Location Capture**: Captures WhatsApp Location Pins and saves them as GeoJSON \`[longitude, latitude]\` in the User profile.
- **State Machine**: Uses \`User.botState.status\` to determine if the user is \`IDLE\`, \`AWAITING_SELECTION\`, \`NEGOTIATING\`, etc.

### 3. Command Parser (\`commandParser.js\`)
A lightweight Regex-based parser that determines Intent from raw text.
- **Check Balance**: \`/check account balance/i\` -> \`CHECK_BALANCE\`
- **Distance Queries**: \`/buy (.+?) within (\d+)(km|m)/i\` -> \`MATCH_PRODUCT\`
- **Offers**: \`/offer (\d+)/i\` -> \`MAKE_OFFER\`

### 4. GeoSpatial Indexing
The \`Product\` schema uses a \`2dsphere\` index on the \`location\` field.
When a buyer searches for products, \`whatsappBotService.js\` executes an aggregation pipeline using \`$geoNear\` to find matching products nearby.

## Adding New Commands
To add a new command:
1. Open \`services/commandParser.js\`.
2. Add a new Regex test inside \`parseCommand\`.
3. Return a unique \`intent\` string.
4. Open \`services/whatsappBotService.js\`.
5. Add a \`case '{NEW_INTENT}':\` inside the \`switch (parsedCommand.intent)\` block.

## Testing Locally
- You can simulate messages bypassing the webhook by using the unit tests or directly calling \`whatsappBotService.handleIncomingMessage({ from: 'PHONE', text: { body: 'MESSAGE' } })\`.
- Ensure your local MongoDB has the \`2dsphere\` indexes built successfully.
