# ShopKart - E-Commerce Course Registration System

A full-stack e-commerce platform for course registration and management, built with Spring Boot and React.

## 🌐 Live Demo

- **Frontend**: [https://shopkart-enqf.onrender.com](https://shopkart-enqf.onrender.com)
- **Backend**: [https://shopkart-backend-annw.onrender.com](https://shopkart-backend-annw.onrender.com)

## 🚀 Features

### For Students
- 🔐 Secure user authentication (Sign Up / Login)
- 📚 Browse available courses
- 🛒 Shopping cart functionality
- 💳 Course enrollment and payment
- 📋 View enrolled courses
- 👤 User account management (Student/Admin roles)

### For Administrators
- ➕ Add new courses
- ✏️ Edit existing courses
- 🗑️ Delete courses
- 📊 View all enrolled students
- 📦 Bulk import courses via JSON

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.x
- **Language**: Java 17+
- **Security**: Spring Security with BCrypt password encryption
- **Database**: PostgreSQL (Production) / H2 (Development)
- **Build Tool**: Maven
- **Containerization**: Docker

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3

## 📋 Prerequisites

- Java 17 or higher
- Node.js 18+ and npm
- PostgreSQL (for production)
- Docker & Docker Compose (optional)
- Git

## 🏃‍♂️ Local Development Setup

### Option 1: Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Course-Registration-System
   ```

2. **Start the application**
   ```bash
   # Windows
   docker-start.bat
   
   # Linux/Mac
   ./docker-start.sh
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8080

4. **Stop the application**
   ```bash
   # Windows
   docker-stop.bat
   
   # Linux/Mac
   docker-compose down
   ```

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to project root**
   ```bash
   cd Course-Registration-System
   ```

2. **Configure database**
   - Edit `src/main/resources/application.properties`
   - Update database credentials if needed

3. **Build and run**
   ```bash
   # Windows
   mvnw.cmd spring-boot:run
   
   # Linux/Mac
   ./mvnw spring-boot:run
   ```

4. **Backend runs on**: http://localhost:8080

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Frontend runs on**: http://localhost:5173

## 🌍 Deployment

### Deploy to Render

#### Backend Deployment

1. Create a new **Web Service** on Render
2. Connect your GitHub repository
3. Configure build settings:
   - **Build Command**: `mvn clean install`
   - **Start Command**: `java -jar target/Course-Registration-Project-0.0.1-SNAPSHOT.jar`
4. Add environment variables:
   ```
   SPRING_PROFILES_ACTIVE=prod
   DATABASE_URL=<your-postgres-url>
   ```
5. Deploy

#### Frontend Deployment

1. Create a new **Static Site** on Render
2. Connect your GitHub repository
3. Configure build settings:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
4. Add environment variable:
   ```
   VITE_API_BASE_URL=https://your-backend-url.onrender.com
   ```
5. Deploy

**Important**: After deployment, ensure CORS is configured to allow your frontend URL in the backend.

## ⚙️ Configuration

### Frontend Environment Variables

Create `.env.development` and `.env.production` in the `frontend` directory:

```env
# .env.development
VITE_API_BASE_URL=http://localhost:8080

# .env.production
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

### Backend Application Properties

```properties
# src/main/resources/application.properties
spring.application.name=Course-Registration-Project
server.port=8080

# Database configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/coursedb
spring.datasource.username=your-username
spring.datasource.password=your-password
```

## 🔑 Default Users

After initial setup, create users through the signup page or use:

- **Role**: Student or Admin (selected during signup)
- **Password**: Encrypted with BCrypt

## 📡 API Endpoints

### Authentication
- `POST /api/signup` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout

### Courses
- `GET /api/courses` - Get all available courses
- `POST /api/register` - Enroll in a course

### Admin
- `GET /admin/courses/enrolled` - View all enrolled students
- `POST /admin/courses/add` - Add new course
- `DELETE /admin/courses/{id}` - Delete course

### Payment
- `POST /api/payment` - Process payment

## 🐛 Troubleshooting

### CORS Errors
If you encounter CORS errors:
1. Ensure frontend URL is added to `CorsConfig.java`
2. Check controller `@CrossOrigin` annotations
3. Verify `VITE_API_BASE_URL` is set correctly

### Connection Refused Errors
- Check if backend is running
- Verify `VITE_API_BASE_URL` points to correct backend URL
- For production, ensure environment variables are set in Render dashboard

### Build Failures
- Ensure Java 17+ is installed
- Run `mvn clean install` to rebuild
- Clear `node_modules` and reinstall: `npm install`

## 📁 Project Structure

```
Course-Registration-System/
├── src/main/java/              # Backend source code
│   └── com/example/Course/Registration/Project/
│       ├── Configuration/      # Security & CORS config
│       ├── Controller/         # REST API controllers
│       ├── model/             # Entity models
│       ├── Repository/        # JPA repositories
│       └── Service/           # Business logic
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── config/           # API configuration
│   │   ├── context/          # React context (Auth)
│   │   └── styles/           # CSS files
│   └── public/               # Static assets
├── docker-compose.yml         # Docker configuration
├── Dockerfile                # Backend Docker image
└── pom.xml                   # Maven configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Developed with ❤️ for learning and demonstration purposes.

## 🆘 Support

For issues and questions:
- Check the [Troubleshooting](#-troubleshooting) section
- Review `QUICK-FIX.md` for common issues
- Review `RENDER-DEPLOYMENT.md` for deployment help

---

**Note**: This is an educational project. For production use, ensure proper security measures, input validation, and error handling are implemented.
