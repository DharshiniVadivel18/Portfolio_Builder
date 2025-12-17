# Portfolio Builder - MERN Stack

A complete MERN stack application for building personal portfolios with MongoDB database integration.

## Features

- User authentication (signup/login)
- Portfolio builder with form validation
- MongoDB database storage
- Responsive design
- Real-time portfolio generation
- JWT token authentication

## Tech Stack

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcryptjs

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-builder-mern
   ```

2. **Install dependencies**
   ```bash
   npm run setup
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```
   JWT_SECRET=your_jwt_secret_key
   MONGODB_URI=mongodb://localhost:27017/portfolio-builder
   PORT=5000
   ```

4. **Start MongoDB**
   - For local MongoDB: `mongod`
   - For MongoDB Atlas: Use your connection string in MONGODB_URI

5. **Run the application**
   ```bash
   npm run dev
   ```

   This will start both the server (port 5000) and client (port 3000)

### Individual Commands

- **Server only**: `npm run server`
- **Client only**: `npm run client`
- **Build for production**: `npm run build`

## Project Structure

```
portfolio-builder-mern/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components (JSX)
│   │   ├── App.js         # Main App component
│   │   └── index.js       # Entry point
│   └── package.json
├── server.js              # Express server
├── package.json           # Server dependencies
└── .env                   # Environment variables
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Portfolios
- `POST /api/portfolios` - Create portfolio (protected)
- `GET /api/portfolios/:id` - Get portfolio by ID
- `GET /api/portfolios` - Get user portfolios (protected)

## Usage

1. **Register/Login**: Create an account or login
2. **Build Portfolio**: Fill out the portfolio form with your information
3. **Generate**: Submit to create your portfolio
4. **View**: Access your portfolio via the generated link
5. **Share**: Share your portfolio URL with others

## MongoDB Schema

### User Schema
```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  name: String (required),
  timestamps: true
}
```

### Portfolio Schema
```javascript
{
  userId: ObjectId (ref: User),
  name: String,
  position: String,
  profilePicture: String,
  resume: String,
  introduction: String,
  about: String,
  languages: [String],
  projects: [{
    name: String,
    description: String,
    languages: [String],
    link: String
  }],
  experiences: [{
    company: String,
    role: String,
    years: String,
    companyWebsite: String
  }],
  achievements: [{
    title: String,
    description: String,
    date: String
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: String,
    link: String
  }],
  social: {
    facebook: String,
    instagram: String,
    github: String,
    linkedin: String
  },
  timestamps: true
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.