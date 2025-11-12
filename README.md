# Smart Donation System

A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that connects donors with NGOs/admins for seamless resource donation management, approval, and tracking.

## Features

### User Features
- **User Authentication**: Secure signup, login, forgot password, and change password
- **Profile Management**: View and update personal information
- **Browse Categories**: Explore available donation categories
- **Make Donations**: Submit donation requests with item details and quantities
- **Donation Tracking**: View donation history with real-time status updates
- **Responsive Design**: Mobile-friendly interface with modern UI

### Admin Features
- **Admin Dashboard**: Comprehensive statistics and overview
- **Category Management**: Create, read, update, and delete donation categories
- **Donation Management**: View all donations, approve/reject requests
- **User Management**: View and manage all registered users
- **Role-based Access**: Secure admin-only functionality

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS3** - Custom styling with modern design system

### Development Tools
- **MongoDB Compass** - Database management
- **Postman** - API testing
- **Git/GitHub** - Version control
- **ESLint** - Code linting

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (local installation)
- **npm** or **yarn** package manager
- **Git** for version control

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/haripatel07/Smart-Donation-System.git
cd smart-donation-system
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-donation-system
JWT_SECRET=your-super-secret-jwt-key-here
```

Start MongoDB locally, then run the backend:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## Documentation

For detailed technical documentation, API specifications, and project details, see the [`docs/`](./docs/) folder:

- **[API Endpoints](./docs/api-endpoints.txt)** - Complete API documentation with request/response formats
- **[Frontend Routes](./docs/page-endpoints.txt)** - Frontend page routing and component mapping
- **[Project Details](./docs/project_data.md)** - Comprehensive project overview and team contributions
- **[Technical Docs](./docs/project_docs.txt)** - Implementation details, known issues, and recommendations
- **[Viva Questions](./docs/viva-questions.txt)** - Academic presentation questions

## API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user details
- `POST /api/auth/forgot-password` - Reset password
- `POST /api/auth/change-password` - Change password

### Category Endpoints
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Donation Endpoints
- `POST /api/donations` - Create donation
- `GET /api/donations` - List all donations
- `GET /api/donations/user/:userId` - Get user donations
- `PUT /api/donations/:id` - Update donation
- `DELETE /api/donations/:id` - Delete donation
- `PATCH /api/donations/:id/status` - Approve/Reject donation (Admin)

### User Endpoints
- `PUT /api/users/profile` - Update user profile

### Admin Endpoints
- `GET /api/admin/users` - List all users (Admin)

## Project Structure

```
smart-donation-system/
├── Backend/
│   ├── app.js                 # Main application file
│   ├── package.json           # Backend dependencies
│   ├── config/
│   │   ├── db.js             # Database configuration
│   │   └── jwt.js            # JWT configuration
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Custom middleware
│   ├── models/               # Mongoose schemas
│   └── routes/               # API routes
├── Frontend/
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── styles/          # CSS stylesheets
│   │   ├── utils/           # Utility functions
│   │   └── main.jsx         # App entry point
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js       # Vite configuration
├── docs/                     # Documentation files
└── README.md                 # Project documentation
```

## 👥 Team

- **Hari Patel** - Backend Development & Database Design
- **Dev Patel** - Frontend Development & UI/UX
- **Het Patel** - Admin Features & Quality Assurance

## Development Workflow

1. **Planning**: Define requirements and divide tasks
2. **Development**: Implement features in separate branches
3. **Testing**: Test APIs with Postman and UI functionality
4. **Code Review**: Create pull requests for team review
5. **Integration**: Merge approved changes to main branch

## Testing

### API Testing
- Import the Postman collection from `docs/` directory
- Test all endpoints with appropriate authentication
- Verify response formats and error handling

### Database Testing
- Use MongoDB Compass to verify data integrity
- Check schema relationships and data population

## Deployment

### Backend Deployment
```bash
cd Backend
npm run build  # If build script exists
npm start
```

### Frontend Deployment
```bash
cd Frontend
npm run build
npm run preview  # For preview
# Deploy the dist/ folder to your hosting service
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Support

For questions or support, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for connecting donors with those in need**