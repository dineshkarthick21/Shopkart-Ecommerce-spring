#!/bin/bash

# Quick start script for ShopKart Backend with Docker

echo "========================================"
echo "ShopKart Backend - Docker Setup"
echo "========================================"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "ERROR: Docker is not running!"
    echo "Please start Docker and try again."
    exit 1
fi

echo "Docker is running..."
echo ""

# Stop and remove existing containers
echo "Cleaning up old containers..."
docker-compose down -v

echo ""
echo "Building and starting services..."
echo "This may take a few minutes on first run..."
echo ""

# Build and start services
docker-compose up -d --build

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Failed to start services!"
    exit 1
fi

echo ""
echo "========================================"
echo "Services started successfully!"
echo "========================================"
echo ""
echo "MongoDB:      http://localhost:27017"
echo "Backend API:  http://localhost:8080"
echo "Health Check: http://localhost:8080/actuator/health"
echo ""
echo "MongoDB Credentials:"
echo "  Username: admin"
echo "  Password: admin123"
echo "  Database: coursedb"
echo ""
echo "To view logs:"
echo "  docker-compose logs -f"
echo ""
echo "To stop services:"
echo "  docker-compose down"
echo ""
echo "Waiting for services to be healthy..."
sleep 10

# Check health
echo ""
echo "Checking service health..."
if curl -s http://localhost:8080/actuator/health > /dev/null 2>&1; then
    echo "✓ Backend is healthy and ready!"
else
    echo "⚠ Backend is starting... (may take a minute)"
    echo "Run: docker-compose logs -f backend"
fi

echo ""
