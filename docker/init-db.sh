#!/bin/bash

# Set timeout duration (in seconds)
TIMEOUT=90
ELAPSED=0

# Wait for SQL Server to be ready
until /opt/mssql-tools18/bin/sqlcmd -b -l 0 -C -N true -S StoriesDb -U sa -P "${SA_PASSWORD}" -Q "SELECT 1"
do
  if [ $ELAPSED -ge $TIMEOUT ]; then
    echo "Timeout waiting for SQL Server to be ready after ${TIMEOUT} seconds"
    exit 1
  fi
  echo "Waiting for SQL Server to be ready... ($ELAPSED seconds)"
  sleep 5
  let ELAPSED+=5
done

echo "SQL Server is ready"

# Create the database if it doesn't exist
/opt/mssql-tools18/bin/sqlcmd -b -l 0 -C -N true -S StoriesDb -U sa -P "${SA_PASSWORD}" -Q "IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = N'StoriesDb') CREATE DATABASE StoriesDb;"

# Run any additional database setup tasks here
# For example, you could run EF Core migrations:
# dotnet ef database update --project Infrastructure/Infrastructure.csproj --startup-project Infrastructure/Infrastructure.csproj --connection "Server=sqlserver;Database=StoriesDb;User Id=sa;Password=${SA_PASSWORD};TrustServerCertificate=True;"

# Add any additional database setup tasks here, such as:
# - Seeding initial data
# - Running stored procedures
# - Setting up users and permissions

echo "Database initialization and setup completed successfully"