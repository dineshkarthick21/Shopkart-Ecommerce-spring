@echo off
REM Stop script for ShopKart Backend Docker containers

echo ========================================
echo Stopping ShopKart Backend Services
echo ========================================
echo.

docker-compose down

if %errorlevel% equ 0 (
    echo.
    echo ✓ All services stopped successfully!
) else (
    echo.
    echo ⚠ Error stopping services
)

echo.
echo To remove all data volumes as well, run:
echo   docker-compose down -v
echo.
pause
