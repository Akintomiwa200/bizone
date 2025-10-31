Backend Folder Structure



backend/
├── server.js                 # Entry point
├── config/
│   ├── database.js          # MongoDB connection
│   ├── cloudinary.js        # File upload config
│   └── payment.js           # Payment gateway config
├── models/
│   ├── User.js
│   ├── Business.js
│   ├── Product.js
│   ├── Order.js
│   ├── Delivery.js
│   ├── Rider.js
│   └── Transaction.js
├── routes/
│   ├── auth.js
│   ├── businesses.js
│   ├── products.js
│   ├── orders.js
│   ├── delivery.js
│   ├── payment.js
│   └── analytics.js
├── controllers/
│   ├── authController.js
│   ├── businessController.js
│   ├── productController.js
│   ├── orderController.js
│   ├── deliveryController.js
│   └── paymentController.js
├── middleware/
│   ├── auth.js
│   ├── validation.js
│   ├── upload.js
│   └── errorHandler.js
├── utils/
│   ├── helpers.js
│   ├── notifications.js
│   ├── creditScoring.js
│   └── location.js
├── services/
│   ├── paymentService.js
│   ├── deliveryService.js
│   ├── notificationService.js
│   └── analyticsService.js
└── tests/
    ├── auth.test.js
    └── business.test.js







Frontend Folder Structure




frontend/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── business/
│   │   ├── products/
│   │   ├── orders/
│   │   └── analytics/
│   ├── (rider)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/               # Next.js API routes
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Loading.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── DashboardLayout.tsx
│   ├── business/
│   │   ├── BusinessCard.tsx
│   │   ├── ProductForm.tsx
│   │   └── InventoryTable.tsx
│   ├── orders/
│   │   ├── OrderCard.tsx
│   │   ├── OrderTimeline.tsx
│   │   └── CreateOrder.tsx
│   └── delivery/
│       ├── DeliveryMap.tsx
│       ├── RiderCard.tsx
│       └── TrackingView.tsx
├── lib/
│   ├── utils.ts
│   ├── api.ts
│   ├── socket.ts
│   └── store.ts           # Zustand store
├── hooks/
│   ├── useAuth.ts
│   ├── useBusiness.ts
│   ├── useOrders.ts
│   └── useSocket.ts
├── types/
│   ├── business.ts
│   ├── order.ts
│   └── index.ts
└── public/
    ├── images/
    └── icons/