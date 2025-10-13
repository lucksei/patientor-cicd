#!/bin/bash

# Build the frontend
echo "Build the frontend"
cd frontend
npm install
npm run build
cd ..

# Build the backend
echo "Build the backend"
cd backend
npm install
npm run tsc
cd ..

echo "Done building 🤙"