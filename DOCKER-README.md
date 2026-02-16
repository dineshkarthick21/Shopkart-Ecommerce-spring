# Docker Deployment Guide for ShopKart Backend

This guide explains how to build and run the Spring Boot backend using Docker.

## 📋 Prerequisites

- Docker installed (version 20.10 or higher)
- Docker Compose installed (version 2.0 or higher)

## 🚀 Quick Start

### Option 1: Using Docker Compose (Recommended)

This will start both MongoDB and the Spring Boot application:

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (clean restart)
docker-compose down -v
```

### Option 2: Using Docker Only

If you already have MongoDB running locally or elsewhere:

```bash
# Build the Docker image
docker build -t shopkart-backend .

# Run the container
docker run -d \
  --name shopkart-backend \
  -p 8080:8080 \
  -e SPRING_DATA_MONGODB_URI=mongodb://localhost:27017/coursedb \
  shopkart-backend

# View logs
docker logs -f shopkart-backend

# Stop the container
docker stop shopkart-backend

# Remove the container
docker rm shopkart-backend
```

## 🔧 Configuration

### Environment Variables

You can customize the application using environment variables:

```bash
docker run -d \
  --name shopkart-backend \
  -p 8080:8080 \
  -e SPRING_DATA_MONGODB_URI=mongodb://your-mongo-host:27017/coursedb \
  -e SPRING_DATA_MONGODB_DATABASE=coursedb \
  -e JAVA_OPTS="-Xmx1g -Xms512m" \
  shopkart-backend
```

### Docker Compose Environment Variables

Edit the `docker-compose.yml` file to change:
- MongoDB credentials
- Database name
- Port mappings
- Memory limits

## 📊 Monitoring

### Health Check

The application includes a health check endpoint:

```bash
curl http://localhost:8080/actuator/health
```

### View Logs

```bash
# Docker Compose
docker-compose logs -f backend

# Docker
docker logs -f shopkart-backend
```

### Access MongoDB

```bash
# Connect to MongoDB container
docker exec -it shopkart-mongodb mongosh -u admin -p admin123

# Use the database
use coursedb

# Show collections
show collections
```

## 🏗️ Building for Production

### Optimize Image Size

The Dockerfile uses multi-stage builds to keep the final image small:
- Build stage: ~800MB (includes Maven and JDK)
- Runtime stage: ~200MB (only JRE and app)

### Custom Build

```bash
# Build with custom tag
docker build -t shopkart-backend:v1.0.0 .

# Build with build arguments
docker build \
  --build-arg JAVA_VERSION=17 \
  -t shopkart-backend:latest .
```

## 🌐 Network Configuration

The Docker Compose setup creates a bridge network (`shopkart-network`) that allows:
- Backend to communicate with MongoDB
- Isolated network for security
- Easy service discovery

## 💾 Data Persistence

MongoDB data is persisted using Docker volumes:
- `mongodb_data`: Database files
- `mongodb_config`: Configuration files

To backup MongoDB data:

```bash
# Backup
docker exec shopkart-mongodb mongodump --out /backup

# Restore
docker exec shopkart-mongodb mongorestore /backup
```

## 🔍 Troubleshooting

### Container won't start

```bash
# Check container logs
docker logs shopkart-backend

# Check if port is already in use
netstat -ano | findstr :8080

# Inspect container
docker inspect shopkart-backend
```

### MongoDB connection issues

```bash
# Check if MongoDB is running
docker ps | findstr mongodb

# Test MongoDB connection
docker exec shopkart-mongodb mongosh --eval "db.adminCommand('ping')"
```

### Rebuild after code changes

```bash
# Rebuild and restart
docker-compose up -d --build

# Or with Docker
docker build -t shopkart-backend . && docker restart shopkart-backend
```

## 📦 Image Management

### Push to Docker Registry

```bash
# Tag the image
docker tag shopkart-backend:latest your-registry/shopkart-backend:latest

# Push to registry
docker push your-registry/shopkart-backend:latest
```

### Clean up

```bash
# Remove unused images
docker image prune -a

# Remove all stopped containers
docker container prune

# Remove unused volumes
docker volume prune
```

## 🔐 Security Best Practices

1. **Change default MongoDB credentials** in production
2. **Use secrets management** for sensitive data
3. **Run as non-root user** (already configured in Dockerfile)
4. **Keep base images updated** regularly
5. **Scan images for vulnerabilities**: `docker scan shopkart-backend`

## 📝 Application Endpoints

Once running, the backend will be available at:

- **API Base URL**: http://localhost:8080
- **Health Check**: http://localhost:8080/actuator/health
- **Admin Courses**: http://localhost:8080/admin/courses
- **Login**: http://localhost:8080/login

## 🚢 Deployment to Cloud

### AWS ECS/EKS
```bash
# Tag for ECR
docker tag shopkart-backend:latest aws_account_id.dkr.ecr.region.amazonaws.com/shopkart-backend:latest

# Push to ECR
docker push aws_account_id.dkr.ecr.region.amazonaws.com/shopkart-backend:latest
```

### Azure Container Registry
```bash
# Tag for ACR
docker tag shopkart-backend:latest yourregistry.azurecr.io/shopkart-backend:latest

# Push to ACR
docker push yourregistry.azurecr.io/shopkart-backend:latest
```

### Google Container Registry
```bash
# Tag for GCR
docker tag shopkart-backend:latest gcr.io/project-id/shopkart-backend:latest

# Push to GCR
docker push gcr.io/project-id/shopkart-backend:latest
```

## 📄 License

This project is part of the ShopKart e-commerce application.
