Backend Folder Structure


bizone-backend/
├── server.js                      # Main entry point
├── app.js                         # Express app configuration
├── config/
│   ├── database.js               # MongoDB connection & models
│   ├── cloudinary.js             # File upload configuration
│   ├── payment.js                # Payment gateway config (Paystack, Flutterwave)
│   ├── whatsapp.js               # WhatsApp Business API configuration
│   ├── redis.js                  # Redis for caching & sessions
│   ├── environment.js            # Environment variables validation
│   └── constants.js              # App constants & enums
├── models/
│   ├── User.js                   # User schema (business owners, customers)
│   ├── Business.js              # Business profile & settings
│   ├── Product.js               # Product catalog management
│   ├── Inventory.js             # Inventory tracking
│   ├── Order.js                 # Order management
│   ├── OrderItem.js             # Order line items
│   ├── Delivery.js              # Delivery logistics
│   ├── Rider.js                 # Delivery riders
│   ├── Transaction.js           # Payment transactions
│   ├── Invoice.js               # Invoice generation
│   ├── Customer.js              # Customer management
│   ├── CreditScore.js           # Credit scoring data
│   ├── LoanApplication.js       # Loan applications
│   ├── Notification.js          # Notification records
│   ├── Chat.js                  # WhatsApp chat sessions
│   ├── Analytics.js             # Analytics data
│   └── AuditLog.js              # Audit trails
├── routes/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── auth.js          # Authentication routes
│   │   │   ├── businesses.js    # Business management
│   │   │   ├── products.js      # Product CRUD operations
│   │   │   ├── inventory.js     # Inventory management
│   │   │   ├── orders.js        # Order processing
│   │   │   ├── customers.js     # Customer management
│   │   │   ├── delivery.js      # Delivery logistics
│   │   │   ├── payment.js       # Payment processing
│   │   │   ├── loans.js         # Loan applications
│   │   │   ├── analytics.js     # Business analytics
│   │   │   ├── notifications.js # Notifications
│   │   │   └── uploads.js       # File uploads
│   │   └── v2/                  # Future API version
│   ├── webhooks/
│   │   ├── payment.js           # Payment webhooks (Paystack, Flutterwave)
│   │   ├── whatsapp.js          # WhatsApp webhooks
│   │   └── delivery.js          # Delivery service webhooks
│   └── admin/
│       ├── users.js             # Admin user management
│       ├── businesses.js        # Admin business management
│       └── analytics.js         # Admin analytics
├── controllers/
│   ├── authController.js        # Authentication logic
│   ├── businessController.js    # Business operations
│   ├── productController.js     # Product management
│   ├── inventoryController.js   # Inventory control
│   ├── orderController.js       # Order processing
│   ├── customerController.js    # Customer management
│   ├── deliveryController.js    # Delivery management
│   ├── paymentController.js     # Payment handling
│   ├── loanController.js        # Loan processing
│   ├── analyticsController.js   # Analytics & reports
│   ├── notificationController.js # Notifications
│   ├── uploadController.js      # File uploads
│   ├── whatsappController.js    # WhatsApp integration
│   └── adminController.js       # Admin functions
├── middleware/
│   ├── auth.js                  # Authentication middleware
│   ├── validation.js            # Request validation
│   ├── upload.js                # File upload handling
│   ├── errorHandler.js          # Global error handling
│   ├── rateLimiter.js           # Rate limiting
│   ├── cache.js                 # Caching middleware
│   ├── logger.js                # Request logging
│   ├── permissions.js           # Role-based access control
│   └── sanitize.js              # Data sanitization
├── services/
│   ├── payment/
│   │   ├── paymentService.js    # Payment abstraction layer
│   │   ├── paystackService.js   # Paystack integration
│   │   ├── flutterwaveService.js # Flutterwave integration
│   │   └── transactionService.js # Transaction management
│   ├── delivery/
│   │   ├── deliveryService.js   # Delivery coordination
│   │   ├── riderService.js      # Rider management
│   │   ├── logisticsService.js  # Logistics providers
│   │   └── trackingService.js   # Package tracking
│   ├── communication/
│   │   ├── whatsapp/
│   │   │   ├── whatsappService.js       # Main WhatsApp service
│   │   │   ├── messageTemplates.js      # Message templates
│   │   │   ├── sessionManager.js        # Chat sessions
│   │   │   ├── orderNotifications.js    # Order updates
│   │   │   ├── paymentNotifications.js  # Payment alerts
│   │   │   └── deliveryNotifications.js # Delivery updates
│   │   ├── emailService.js      # Email notifications
│   │   ├── smsService.js        # SMS notifications
│   │   └── notificationService.js # Unified notifications
│   ├── financial/
│   │   ├── creditScoring.js     # Credit assessment
│   │   ├── loanService.js       # Loan management
│   │   ├── invoiceService.js    # Invoice generation
│   │   └── reconciliation.js    # Payment reconciliation
│   ├── analytics/
│   │   ├── businessAnalytics.js # Business insights
│   │   ├── salesAnalytics.js    # Sales reports
│   │   ├── customerAnalytics.js # Customer behavior
│   │   └── financialAnalytics.js # Financial reports
│   └── storage/
│       ├── cloudinaryService.js # Image/video storage
│       ├── fileService.js       # File management
│       └── backupService.js     # Data backup
├── utils/
│   ├── helpers.js               # Common utilities
│   ├── validators.js            # Validation functions
│   ├── generators.js            # ID, reference generators
│   ├── formatters.js            # Data formatting
│   ├── calculations.js          # Business calculations
│   ├── location.js              # Location services
│   ├── dateTime.js              # Date/time utilities
│   ├── currency.js              # Currency formatting
│   └── nigerian-specific/
│       ├── statesLga.js         # Nigerian states & LGAs
│       ├── banks.js             # Nigerian banks list
│       └── regulations.js       # Business regulations
├── jobs/
│   ├── cron/
│   │   ├── inventoryAlerts.js   # Low stock alerts
│   │   ├── paymentReminders.js  # Payment reminders
│   │   ├── orderFollowups.js    # Order follow-ups
│   │   ├── reportGeneration.js  # Automated reports
│   │   └── dataCleanup.js       # Data cleanup tasks
│   ├── queues/
│   │   ├── emailQueue.js        # Email queue
│   │   ├── notificationQueue.js # Notification queue
│   │   ├── paymentQueue.js      # Payment processing queue
│   │   └── deliveryQueue.js     # Delivery assignment queue
│   └── workers/
│       ├── emailWorker.js       # Email processing
│       ├── notificationWorker.js # Notification processing
│       └── analyticsWorker.js   # Analytics processing
├── templates/
│   ├── emails/
│   │   ├── welcome.hbs          # Welcome email
│   │   ├── order-confirmation.hbs # Order confirmation
│   │   ├── invoice.hbs          # Invoice template
│   │   └── report.hbs           # Report template
│   ├── whatsapp/
│   │   ├── order-confirmation.txt # Order confirmation
│   │   ├── payment-received.txt # Payment confirmation
│   │   ├── delivery-update.txt  # Delivery updates
│   │   └── promotional.txt      # Promotional messages
│   └── documents/
│       ├── invoice-template.hbs # Invoice document
│       └── receipt-template.hbs # Receipt document
├── docs/
│   ├── api/
│   │   ├── swagger.yaml         # API documentation
│   │   └── postman-collection.json # Postman collection
│   ├── integration/
│   │   ├── whatsapp-setup.md    # WhatsApp setup guide
│   │   ├── payment-integration.md # Payment setup
│   │   └── delivery-integration.md # Delivery setup
│   └── deployment/
│       ├── production-setup.md  # Production deployment
│       └── environment-variables.md # Environment setup
├── tests/
│   ├── unit/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── utils/
│   │   └── middleware/
│   ├── integration/
│   │   ├── api/
│   │   ├── webhooks/
│   │   └── database/
│   ├── fixtures/
│   │   ├── users.json           # Test user data
│   │   ├── businesses.json      # Test business data
│   │   └── products.json        # Test product data
│   ├── mocks/
│   │   ├── payment.js           # Payment service mocks
│   │   ├── whatsapp.js          # WhatsApp service mocks
│   │   └── delivery.js          # Delivery service mocks
│   └── setup.js                 # Test setup
├── scripts/
│   ├── deployment/
│   │   ├── deploy.sh            # Deployment script
│   │   ├── migrate.js           # Database migrations
│   │   └── backup.js            # Backup script
│   ├── seed/
│   │   ├── seedDatabase.js      # Database seeding
│   │   └── sampleData.js        # Sample data
│   └── maintenance/
│       ├── cleanup.js           # Data cleanup
│       └── health-check.js      # System health check
├── logs/
│   ├── access.log               # Access logs
│   ├── error.log                # Error logs
│   ├── application.log          # Application logs
│   └── whatsapp.log             # WhatsApp integration logs
├── public/
│   ├── uploads/                 # Static file uploads
│   │   ├── products/            # Product images
│   │   ├── businesses/          # Business documents
│   │   └── invoices/            # Generated invoices
│   └── templates/               # Public templates
├── .env.example                 # Environment variables template
├── package.json                 # Dependencies
├── package-lock.json           # Lock file
├── docker-compose.yml          # Docker compose for services
├── Dockerfile                  # Docker configuration
├── README.md                   # Project documentation
└── .gitignore                  # Git ignore rules












Frontend Folder Structure



frontend/
├── app/                            # Next.js 14 App Router
│   ├── (auth)/
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       ├── LoginForm.tsx
│   │   │       └── SocialAuth.tsx
│   │   ├── register/
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       ├── RegisterForm.tsx
│   │   │       ├── BusinessTypeStep.tsx
│   │   │       └── VerificationStep.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   ├── reset-password/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Dashboard overview
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── business/
│   │   │   ├── page.tsx              # Business management
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   └── staff/
│   │   │       └── page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx              # Product catalog
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx          # Product details
│   │   │   ├── create/
│   │   │   │   └── page.tsx
│   │   │   └── categories/
│   │   │       └── page.tsx
│   │   ├── inventory/
│   │   │   ├── page.tsx              # Inventory management
│   │   │   ├── stock-alerts/
│   │   │   │   └── page.tsx
│   │   │   └── movements/
│   │   │       └── page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx              # Orders management
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx          # Order details
│   │   │   ├── create/
│   │   │   │   └── page.tsx
│   │   │   └── draft/
│   │   │       └── page.tsx
│   │   ├── customers/
│   │   │   ├── page.tsx              # Customer CRM
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── groups/
│   │   │       └── page.tsx
│   │   ├── delivery/
│   │   │   ├── page.tsx              # Delivery management
│   │   │   ├── tracking/
│   │   │   │   └── page.tsx
│   │   │   ├── riders/
│   │   │   │   └── page.tsx
│   │   │   └── zones/
│   │   │       └── page.tsx
│   │   ├── finances/
│   │   │   ├── page.tsx              # Financial management
│   │   │   ├── transactions/
│   │   │   │   └── page.tsx
│   │   │   ├── invoices/
│   │   │   │   └── page.tsx
│   │   │   └── loans/
│   │   │       └── page.tsx
│   │   ├── analytics/
│   │   │   ├── page.tsx              # Business analytics
│   │   │   ├── sales/
│   │   │   │   └── page.tsx
│   │   │   ├── customers/
│   │   │   │   └── page.tsx
│   │   │   └── inventory/
│   │   │       └── page.tsx
│   │   ├── whatsapp-ai/
│   │   │   ├── page.tsx              # WhatsApp AI Chat dashboard
│   │   │   ├── templates/
│   │   │   │   └── page.tsx
│   │   │   ├── automation/
│   │   │   │   └── page.tsx
│   │   │   └── analytics/
│   │   │       └── page.tsx
│   │   └── settings/
│   │       ├── page.tsx
│   │       ├── notifications/
│   │       │   └── page.tsx
│   │       └── integrations/
│   │           └── page.tsx
│   ├── (rider)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                   # Rider dashboard
│   │   ├── deliveries/
│   │   │   └── page.tsx
│   │   ├── earnings/
│   │   │   └── page.tsx
│   │   └── profile/
│   │       └── page.tsx
│   ├── (customer)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                   # Customer facing
│   │   ├── store/
│   │   │   └── [businessId]/
│   │   │       └── page.tsx
│   │   └── orders/
│   │       └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── route.ts
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── webhooks/
│   │   │   ├── whatsapp/
│   │   │   │   └── route.ts          # WhatsApp webhook handler
│   │   │   ├── payment/
│   │   │   │   └── route.ts
│   │   │   └── delivery/
│   │   │       └── route.ts
│   │   ├── chat/
│   │   │   ├── route.ts              # AI chat endpoint
│   │   │   ├── sessions/
│   │   │   │   └── route.ts
│   │   │   └── webhook/
│   │   │       └── route.ts
│   │   └── upload/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx                     # Root layout
│   ├── page.tsx                       # Landing page
│   ├── loading.tsx
│   ├── error.tsx
│   └── not-found.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Loading.tsx
│   │   ├── Card.tsx
│   │   ├── Table.tsx
│   │   ├── Badge.tsx
│   │   ├── Select.tsx
│   │   ├── DatePicker.tsx
│   │   ├── Search.tsx
│   │   ├── Pagination.tsx
│   │   ├── Tabs.tsx
│   │   ├── Accordion.tsx
│   │   ├── Toast.tsx
│   │   ├── Tooltip.tsx
│   │   ├── Skeleton.tsx
│   │   └── Chart.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── DashboardLayout.tsx
│   │   ├── RiderLayout.tsx
│   │   ├── CustomerLayout.tsx
│   │   ├── Navigation/
│   │   │   ├── MainNav.tsx
│   │   │   ├── UserNav.tsx
│   │   │   └── MobileNav.tsx
│   │   └── Footer.tsx
│   ├── business/
│   │   ├── BusinessCard.tsx
│   │   ├── BusinessProfile.tsx
│   │   ├── BusinessForm.tsx
│   │   ├── ProductForm.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── InventoryTable.tsx
│   │   ├── StockAlert.tsx
│   │   ├── CategoryManager.tsx
│   │   └── BusinessOnboarding.tsx
│   ├── orders/
│   │   ├── OrderCard.tsx
│   │   ├── OrderList.tsx
│   │   ├── OrderTimeline.tsx
│   │   ├── CreateOrder.tsx
│   │   ├── OrderDetails.tsx
│   │   ├── OrderActions.tsx
│   │   ├── InvoiceGenerator.tsx
│   │   └── OrderFilters.tsx
│   ├── delivery/
│   │   ├── DeliveryMap.tsx
│   │   ├── RiderCard.tsx
│   │   ├── TrackingView.tsx
│   │   ├── DeliveryAssignment.tsx
│   │   ├── RouteOptimizer.tsx
│   │   ├── LiveTracking.tsx
│   │   └── DeliveryProof.tsx
│   ├── finances/
│   │   ├── TransactionList.tsx
│   │   ├── InvoiceList.tsx
│   │   ├── LoanCalculator.tsx
│   │   ├── PaymentForm.tsx
│   │   ├── RevenueChart.tsx
│   │   └── ExpenseTracker.tsx
│   ├── analytics/
│   │   ├── DashboardStats.tsx
│   │   ├── SalesChart.tsx
│   │   ├── CustomerInsights.tsx
│   │   ├── InventoryAnalytics.tsx
│   │   ├── PerformanceMetrics.tsx
│   │   └── ReportGenerator.tsx
│   ├── whatsapp-ai/
│   │   ├── ChatInterface.tsx         # Main AI chat component
│   │   ├── MessageBubble.tsx
│   │   ├── ChatInput.tsx
│   │   ├── QuickReplies.tsx
│   │   ├── ChatSession.tsx
│   │   ├── TemplateMessages.tsx
│   │   ├── AutomationRules.tsx
│   │   ├── AIResponseHandler.tsx
│   │   ├── ConversationFlow.tsx
│   │   └── ChatAnalytics.tsx
│   ├── customers/
│   │   ├── CustomerCard.tsx
│   │   ├── CustomerList.tsx
│   │   ├── CustomerProfile.tsx
│   │   ├── CustomerSegmentation.tsx
│   │   └── CommunicationHistory.tsx
│   └── shared/
│       ├── SearchBar.tsx
│       ├── FilterPanel.tsx
│       ├── DataTable.tsx
│       ├── EmptyState.tsx
│       ├── ErrorBoundary.tsx
│       ├── OfflineIndicator.tsx
│       ├── QRCodeGenerator.tsx
│       └── FileUpload.tsx
├── lib/
│   ├── utils/
│   │   ├── index.ts                  # Common utilities
│   │   ├── formatters.ts             # Data formatting
│   │   ├── validators.ts             # Form validation
│   │   ├── calculations.ts           # Business calculations
│   │   ├── currency.ts               # Currency formatting
│   │   └── nigerian-utils.ts         # Nigeria-specific utils
│   ├── api/
│   │   ├── client.ts                 # API client setup
│   │   ├── auth.ts                   # Auth API calls
│   │   ├── business.ts               # Business API
│   │   ├── products.ts               # Products API
│   │   ├── orders.ts                 # Orders API
│   │   ├── delivery.ts               # Delivery API
│   │   ├── payment.ts                # Payment API
│   │   ├── analytics.ts              # Analytics API
│   │   ├── whatsapp.ts               # WhatsApp API
│   │   └── chat.ts                   # AI Chat API
│   ├── socket/
│   │   ├── socket.ts                 # Socket.io client
│   │   ├── events.ts                 # Socket events
│   │   └── handlers.ts               # Event handlers
│   ├── store/
│   │   ├── index.ts                  # Zustand store
│   │   ├── auth-store.ts             # Authentication store
│   │   ├── business-store.ts         # Business store
│   │   ├── order-store.ts            # Orders store
│   │   ├── delivery-store.ts         # Delivery store
│   │   ├── chat-store.ts             # AI Chat store
│   │   └── ui-store.ts               # UI state store
│   ├── auth/
│   │   ├── auth.ts                   # Auth configuration
│   │   ├── providers.tsx             # Auth providers
│   │   └── middleware.ts             # Auth middleware
│   ├── ai/
│   │   ├── chat-engine.ts            # AI chat engine
│   │   ├── nlp-processor.ts          # Natural language processing
│   │   ├── intent-recognition.ts     # User intent detection
│   │   ├── response-generator.ts     # AI response generation
│   │   ├── whatsapp-integration.ts   # WhatsApp AI integration
│   │   └── templates.ts              # AI response templates
│   └── services/
│       ├── payment-service.ts        # Payment handling
│       ├── notification-service.ts   # Push notifications
│       ├── storage-service.ts        # Local storage
│       ├── geolocation-service.ts    # Location services
│       └── offline-service.ts        # Offline support
├── hooks/
│   ├── useAuth.ts
│   ├── useBusiness.ts
│   ├── useProducts.ts
│   ├── useOrders.ts
│   ├── useDelivery.ts
│   ├── usePayment.ts
│   ├── useAnalytics.ts
│   ├── useSocket.ts
│   ├── useChat.ts                    # AI Chat hook
│   ├── useWhatsApp.ts                # WhatsApp integration hook
│   ├── useGeolocation.ts
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   ├── useOnlineStatus.ts
│   └── usePermissions.ts
├── types/
│   ├── auth.ts
│   ├── business.ts
│   ├── product.ts
│   ├── order.ts
│   ├── delivery.ts
│   ├── payment.ts
│   ├── customer.ts
│   ├── analytics.ts
│   ├── chat.ts                       # AI Chat types
│   ├── whatsapp.ts                   # WhatsApp types
│   └── index.ts
├── styles/
│   ├── globals.css
│   ├── components/
│   │   ├── buttons.css
│   │   ├── forms.css
│   │   └── layout.css
│   ├── themes/
│   │   ├── light-theme.css
│   │   ├── dark-theme.css
│   │   └── variables.css
│   └── nigerian-styles/
│       ├── colors.css                # Nigerian brand colors
│       └── typography.css
├── public/
│   ├── images/
│   │   ├── logo/
│   │   ├── icons/
│   │   ├── products/
│   │   ├── banners/
│   │   └── illustrations/
│   ├── icons/
│   │   ├── social/
│   │   ├── payment/
│   │   ├── business/
│   │   └── flags/
│   └── fonts/
│       ├── nigerian-sans/
│       └── custom-icons/
├── config/
│   ├── app.config.ts
│   ├── theme.config.ts
│   ├── api.config.ts
│   ├── whatsapp.config.ts            # WhatsApp API config
│   ├── ai.config.ts                  # AI service config
│   └── nigerian.config.ts            # Nigeria-specific config
├── constants/
│   ├── routes.ts
│   ├── api-endpoints.ts
│   ├── business-types.ts
│   ├── nigerian-states.ts
│   ├── currencies.ts
│   ├── payment-methods.ts
│   ├── order-status.ts
│   ├── delivery-status.ts
│   ├── chat-intents.ts               # AI chat intents
│   └── whatsapp-templates.ts         # WhatsApp message templates
├── utils/
│   ├── test-utils.tsx                # Testing utilities
│   ├── mock-data.ts                  # Mock data for development
│   └── providers.tsx                 # Context providers
├── docs/
│   ├── setup.md
│   ├── deployment.md
│   └── api-integration.md
├── next.config.js
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json
├── package.json
├── postcss.config.js
└── .env.localtend