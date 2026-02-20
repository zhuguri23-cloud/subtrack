# SubTrack - Subscription Management System

A full-stack subscription management application that helps users track, analyze, and manage their SaaS subscriptions in one place.

![SubTrack Dashboard](https://via.placeholder.com/800x400?text=SubTrack+Dashboard)

## Features

### Core Features
- **User Authentication** - Secure JWT-based registration and login
- **Subscription Management** - Add, edit, delete, and view all your subscriptions
- **Dashboard Overview** - Quick stats on monthly/yearly spending and active subscriptions
- **Analytics** - Visual insights into spending patterns, categories, and trends
- **Marketplace** - Browse 40+ popular subscription services with pricing
- **Upcoming Renewals** - Track when your subscriptions are due for renewal

### Additional Features
- **Category Breakdown** - See spending by category (Entertainment, Productivity, etc.)
- **Savings Opportunities** - Get suggestions on how to save money
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark/Light Mode Ready** - Easy to extend with theme support

## Tech Stack

### Frontend
- **React 18** - UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Recharts** - Data visualization charts
- **Axios** - HTTP client for API calls
- **Lucide React** - Icon library
- **date-fns** - Date formatting utilities

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation

## Project Structure

```
subtrack/
├── subtrack-frontend/          # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── contexts/           # React contexts (AuthContext)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service functions
│   │   ├── types/              # TypeScript type definitions
│   │   ├── utils/              # Utility functions
│   │   ├── App.tsx             # Main app component
│   │   ├── main.tsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── subtrack-backend/           # Express backend API
│   ├── src/
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Express middleware
│   │   ├── routes/             # API route definitions
│   │   ├── models/             # Data models
│   │   ├── types/              # TypeScript types
│   │   ├── utils/              # Utility functions
│   │   ├── app.ts              # Express app setup
│   │   └── server.ts           # Server entry point
│   ├── dist/                   # Compiled JavaScript
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                    # Environment variables
│
├── package.json                # Root package with scripts
└── README.md                   # This file
```

## Installation

### Prerequisites
- Node.js v18 or higher
- npm or yarn

### Quick Start

1. **Clone or extract the project:**
```bash
cd subtrack
```

2. **Install all dependencies:**
```bash
npm run install:all
```

This will install dependencies for the root, frontend, and backend.

3. **Set up environment variables:**

The environment files are already configured for development:
- Frontend: `subtrack-frontend/.env` (VITE_API_URL=http://localhost:3000/api)
- Backend: `subtrack-backend/.env` (PORT=3000, JWT_SECRET=subtrack_secret_key)

4. **Start the development servers:**
```bash
npm run dev
```

This will start both the backend (port 3000) and frontend (port 5173) concurrently.

5. **Open your browser:**
Navigate to `http://localhost:5173`

## Available Scripts

### Root Directory
| Script | Description |
|--------|-------------|
| `npm run install:all` | Install dependencies for all packages |
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run dev:frontend` | Start frontend only |
| `npm run dev:backend` | Start backend only |
| `npm run build` | Build both frontend and backend for production |
| `npm run build:frontend` | Build frontend only |
| `npm run build:backend` | Build backend only |
| `npm start` | Start production server (backend only) |

### Frontend (subtrack-frontend/)
| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server (port 5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

### Backend (subtrack-backend/)
| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot reload (port 3000) |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |
| DELETE | `/api/auth/account` | Delete account | Yes |

### Subscription Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/subscriptions` | Get all subscriptions | Yes |
| GET | `/api/subscriptions/:id` | Get single subscription | Yes |
| POST | `/api/subscriptions` | Create subscription | Yes |
| PUT | `/api/subscriptions/:id` | Update subscription | Yes |
| DELETE | `/api/subscriptions/:id` | Delete subscription | Yes |
| GET | `/api/subscriptions/stats` | Get statistics | Yes |
| GET | `/api/subscriptions/upcoming` | Get upcoming renewals | Yes |

### Analytics Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/analytics/spending` | Spending by month | Yes |
| GET | `/api/analytics/categories` | Spending by category | Yes |
| GET | `/api/analytics/savings` | Savings opportunities | Yes |
| GET | `/api/analytics/trends` | Spending trends | Yes |
| GET | `/api/analytics/calendar` | Payment calendar | Yes |

### Marketplace Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/marketplace` | Get all items | No |
| GET | `/api/marketplace/categories` | Get categories | No |
| GET | `/api/marketplace/featured` | Featured items | No |
| GET | `/api/marketplace/popular` | Popular items | No |
| GET | `/api/marketplace/search` | Search items | No |
| GET | `/api/marketplace/:id` | Get single item | No |

## Data Models

### User
```typescript
{
  id: string;
  email: string;
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

## Environment Variables

### Frontend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | http://localhost:3000/api |

### Backend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment mode | development |
| `JWT_SECRET` | JWT signing secret | subtrack_secret_key |
| `JWT_EXPIRES_IN` | JWT expiration | 7d |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:5173 |

## Screenshots

### Dashboard
The dashboard provides a quick overview of your subscription spending, including:
- Monthly and yearly spending totals
- Number of active subscriptions
- Recent subscriptions list
- Upcoming renewals
- Category breakdown

### Subscriptions
Manage all your subscriptions in one place:
- View all subscriptions with filtering and search
- Add new subscriptions with detailed information
- Edit existing subscriptions
- Delete subscriptions you no longer need

### Analytics
Visual insights into your spending:
- Monthly spending history with charts
- Category breakdown with pie charts
- Savings opportunities
- Spending trends

### Marketplace
Discover new subscription services:
- Browse 40+ popular services
- Filter by category
- View ratings and starting prices
- Direct links to service websites

## Development

### Frontend Development
```bash
cd subtrack-frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Development
```bash
cd subtrack-backend
npm run dev
```

The backend API will be available at `http://localhost:3000`

### API Testing
You can test the API using curl or tools like Postman:

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123", "name": "John Doe"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'

# Get all subscriptions (requires auth token)
curl http://localhost:3000/api/subscriptions \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Production Deployment

### Build for Production
```bash
npm run build
```

This will create:
- `subtrack-frontend/dist/` - Static frontend files
- `subtrack-backend/dist/` - Compiled backend files

### Deploy Backend
```bash
cd subtrack-backend
npm start
```

### Deploy Frontend
The frontend build creates static files that can be served by any web server:
- Nginx
- Apache
- Vercel
- Netlify
- AWS S3 + CloudFront

### Docker Deployment (Optional)
You can containerize the application using Docker:

```dockerfile
# Example Dockerfile for backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository or contact the development team.

---

Built with by the SubTrack Team
