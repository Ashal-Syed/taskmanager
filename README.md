# Task Manager Web Application

## Overview
This project is a full-stack task management web app designed primarily as a learning platform to master software engineering tools, principles, algorithms, and infrastructure. It features a React frontend with Tailwind CSS styling, a Node.js + Express backend, and a PostgreSQL database—all containerized with Docker. CI/CD is implemented using GitHub Actions.

## Technologies Used
- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Containerization:** Docker, Docker Compose
- **CI/CD:** GitHub Actions with Docker Hub integration
- **Other:** CORS for API security, environment variables managed via dotenv

## Project Structure

├── client/ # React frontend app with Tailwind
├── server/ # Express backend API server
├── docker-compose.yml # Defines multi-container setup (client, server, db)
├── .github/workflows/ # GitHub Actions CI/CD pipeline config
└── README.md # Project documentation (this file)


## Features Implemented

### Frontend
- Task list display with filtering (status) and sorting (due date)
- Add new tasks via a form
- Mark tasks as done with status update
- Responsive UI styled with Tailwind CSS
- API service layer to interact with backend

### Backend
- RESTful API endpoints:
  - `GET /api/tasks` — fetch all tasks
  - `POST /api/tasks` — add a new task
  - `PUT /api/tasks/:id` — mark task as done
  - `DELETE /api/tasks/:id` — delete a task
- PostgreSQL integration with connection pooling
- Error handling with clear logging and HTTP status codes
- CORS configured for local frontend origin

### Infrastructure
- Dockerized frontend, backend, and database services with Docker Compose
- PostgreSQL container with persistent volume
- Environment variables managed securely via `.env`
- Ports configured to avoid conflicts with system services

### CI/CD Pipeline
- GitHub Actions workflow triggers on `main` branch push
- Docker images for client and server built and pushed to Docker Hub
- Docker Buildx for multi-platform builds

## How to Run Locally

1. Clone the repo
2. Copy `.env.example` to `.env` and fill database credentials
3. Run:
docker compose up --build
4. Access frontend at `http://localhost:5173`
5. Backend API runs on `http://localhost:5050/api/tasks`

## Next Steps & Improvements

- Add unit and integration tests for backend and frontend
- Improve UI/UX with loading states and error messages
- Implement authentication and authorization
- Configure production-grade deployment (e.g., AWS EC2, S3, ECR, CodePipeline)
- Add logging, monitoring, and alerting for production
