# Ticketing
This project is a ticketing platform built using a microservices architecture. It demonstrates how to design, develop, and deploy production-ready distributed systems.

- [Technologies](#technologies)
- [Architecture](#architecture)
- [Services](#services)


## Technologies

- **Node.js**: JavaScript runtime for building server-side applications.
- **TypeScript**: Superset of JavaScript that adds static types.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for data persistence.
- **NATS**: Lightweight messaging system for event-driven communication.
- **Docker**: Containerization for easy deployment.
- **Kubernetes**: Orchestration for managing containerized applications.
- **REDIS**: Expiration service
- **Skaffold**: For local Kubernetes dev loop
- **Ingress-NGINX**: For api gateway and routing
- **GitHub Actions** :CI/CD pipeline
- **React**:  Next.js for SSR

## Architecture

The application follows a microservices architecture, consisting of the following services:

- **Auth Service**: Handles user authentication and authorization.
- **Tickets Service**: Manages ticket creation, updates, and retrieval.
- **Orders Service**: Processes and manages orders for tickets.
- **Expiration Service**: Manages ticket reservation timeouts.
- **Client Service**: Frontend application built with Next.js.

![Architecture Diagram](./architectures/HLD.png)

## Services

### Auth Service
- **Path**: `/api/users/*`
- **Description**: Manages user registration, login, and JWT token generation.
- **Details**:
  - Supports user registration with email and password.
  - Implements password hashing for security.
  - Provides JWT tokens for authenticated sessions.
  - Includes middleware for protecting routes.

![Auth Service Architecture](./architectures/Auth.png)
### Tickets Service
- **Path**: `/api/tickets/*`
- **Description**: Handles ticket creation, retrieval, and updates.
- **Details**:
  - Allows users to create new tickets with details such as event name, date, and price.
  - Supports ticket updates and deletion.
  - Provides endpoints for retrieving ticket information and availability.

![Tickets Service Architecture](./architectures/Ticket.jpg)

