#!/bin/bash
echo "Updating DB_HOST inside the .env file..."
echo "DB_USER=root" > .env
echo "DB_DATABASE=root" >> .env
echo "DB_PASSWORD=password" >> .env
echo "DB_HOST=immer-auch-db" >> .env
echo "DB_PORT=5432" >> .env

echo "Building Docker-Image..."
docker build -t jailbreakereu/immer-auch-backend:latest .

echo "Reverting .env file"
echo "DB_USER=root" > .env
echo "DB_DATABASE=root" >> .env
echo "DB_PASSWORD=password" >> .env
echo "DB_HOST=localhost" >> .env
echo "DB_PORT=5432" >> .env

echo "Pushing Docker-Image..."
docker push jailbreakereu/immer-auch-backend:latest
