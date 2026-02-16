@echo off
REM Quick start script for ShopKart Backend with Docker

echo ========================================
echo ShopKart Backend - Docker Setup
echo ========================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not running!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo Docker is running...
echo.

REM Stop and remove existing containers
echo Cleaning up old containers...
docker-compose down -v

echo.
echo Building and starting services...
echo This may take a few minutes on first run...
echo.

REM Build and start services
docker-compose up -d --build

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to start services!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Services started successfully!
echo ========================================
echo.
echo MongoDB:      http://localhost:27017
echo Backend API:  http://localhost:8080
echo Health Check: http://localhost:8080/actuator/health
echo.
echo MongoDB Credentials:
echo   Username: admin
echo   Password: admin123
echo   Database: coursedb
echo.
echo To view logs:
echo   docker-compose logs -f
echo.
echo To stop services:
echo   docker-compose down
echo.
echo Waiting for services to be healthy...
timeout /t 10 /nobreak >nul

REM Check health
echo.
echo Checking service health...
curl -s http://localhost:8080/actuator/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Backend is healthy and ready!
) else (
    echo ⚠ Backend is starting... (may take a minute)
    echo Run: docker-compose logs -f backend
)

echo.
pause
