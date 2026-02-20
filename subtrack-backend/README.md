# SubTrack Backend API

A complete REST API backend for SubTrack - a SaaS subscription management platform built with Node.js, Express, and TypeScript.

## Features

- 🔐 **JWT Authentication** - Secure user registration and login
- 📋 **Subscription Management** - Full CRUD operations for subscriptions
- 📊 **Analytics** - Spending insights, category breakdown, and savings opportunities
- 🛒 **Marketplace** - Browse 40+ popular subscription services
- 📝 **Input Validation** - Comprehensive request validation
- 🛡️ **Error Handling** - Centralized error handling middleware
- 🌐 **CORS Enabled** - Configured for frontend integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **CORS**: cors
- **UUID Generation**: uuid

## Project Structure

```
subtrack-backend/
├── src/
│   ├── controllers/     # Route controllers
│   │   ├── authController.ts
│   │   ├── subscriptionController.ts
│   │   ├── analyticsController.ts
│   │   └── marketplaceController.ts
│   ├── middleware/      # Express middleware
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── validation.ts
│   ├── routes/          # API routes
│   │   ├── auth.ts
│   │   ├── subscriptions.ts
│   │   ├── analytics.ts
│   │   └── marketplace.ts
│   ├── models/          # Data models (in-memory)
│   │   └── index.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── utils/           # Utilities
│   │   ├── jwt.ts
│   │   └── mockData.ts
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

The server will start at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |
| DELETE | `/api/auth/account` | Delete account | Yes |

### Subscriptions

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/subscriptions` | Get all subscriptions | Yes |
| GET | `/api/subscriptions/:id` | Get single subscription | Yes |
| POST | `/api/subscriptions` | Create subscription | Yes |
| PUT | `/api/subscriptions/:id` | Update subscription | Yes |
| DELETE | `/api/subscriptions/:id` | Delete subscription | Yes |
| GET | `/api/subscriptions/stats` | Get statistics | Yes |
| GET | `/api/subscriptions/upcoming` | Get upcoming renewals | Yes |

### Analytics

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/analytics/spending` | Spending by month | Yes |
| GET | `/api/analytics/categories` | Spending by category | Yes |
| GET | `/api/analytics/savings` | Savings opportunities | Yes |
| GET | `/api/analytics/trends` | Spending trends | Yes |
| GET | `/api/analytics/calendar` | Payment calendar | Yes |

### Marketplace

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/marketplace` | Get all items | No |
| GET | `/api/marketplace/categories` | Get categories | No |
| GET | `/api/marketplace/featured` | Featured items | No |
| GET | `/api/marketplace/popular` | Popular items | No |
| GET | `/api/marketplace/search` | Search items | No |
| GET | `/api/marketplace/:id` | Get single item | No |

## Request Examples

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123",
    "name": "John Doe"
  }'
```

### Login User
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123"
  }'
```

### Create Subscription
```bash
curl -X POST http://localhost:3000/api/subscriptions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Netflix",
    "category": "Entertainment",
    "cost": 15.99,
    "currency": "USD",
    "billingCycle": "monthly",
    "startDate": "2024-01-01",
    "nextRenewal": "2024-02-01",
    "description": "Standard plan"
  }'
```

### Get Marketplace Items
```bash
curl http://localhost:3000/api/marketplace
```

### Search Marketplace
```bash
curl "http://localhost:3000/api/marketplace/search?q=netflix"
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment mode | development |
| `JWT_SECRET` | JWT signing secret | (required) |
| `JWT_EXPIRES_IN` | JWT expiration | 7d |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:5173 |

## Data Models

### User
```typescript
{
  id: string;
  email: string;
  password: string; // hashed
  name: string;
  createdAt: Date;
}
```

### Subscription
```typescript
{
  id: string;
  userId: string;
  name: string;
  category: string;
  cost: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'quarterly' | 'weekly';
  startDate: Date;
  nextRenewal: Date;
  description?: string;
  logoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### MarketplaceItem
```typescript
{
  id: string;
  name: string;
  category: string;
  description: string;
  startingPrice: number;
  logoUrl: string;
  rating: number;
  websiteUrl: string;
}
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## License

MIT
