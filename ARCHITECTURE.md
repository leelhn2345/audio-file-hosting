# Architecture Documentation

## Overview

The Audio File Hosting Platform is a modern, full-stack web application built with
a clear separation between frontend and backend services. The architecture
follows a microservices-inspired approach with containerized components, making
it scalable and maintainable.

## System Architecture

```mermaid
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│     Client      │◄──►│     Server      │◄──►│    Database     │
│   (React SPA)   │    │   (Fastify)     │    │  (PostgreSQL)   │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │                 │
                       │   File Storage  │
                       │    (MinIO)      │
                       │                 │
                       └─────────────────┘
```

## Application Layers

### 1. Presentation Layer (Frontend)

**Technology Stack:**

- React 19 with TypeScript
- TanStack Router for routing
- TanStack Query for state management and API calls
- Tailwind CSS + Radix UI for styling
- Jotai for client-side state management
- Vite for build tooling

**Key Components:**

- **Pages/Routes**: File-based routing using TanStack Router
- **Components**: Reusable UI components built with Radix UI
- **API Layer**: Centralized API client functions
- **State Management**: Jotai atoms for global state
- **Utilities**: Helper functions and custom hooks

**Architecture Pattern:** Component-based architecture with functional components
and hooks

### 2. API Layer (Backend)

**Technology Stack:**

- Fastify with TypeScript
- TypeBox for schema validation
- Drizzle ORM for database operations
- Swagger for API documentation
- bcrypt for password hashing
- jose for JWT handling

**Key Modules:**

- **Authentication**: User registration, login, session management
- **Audio Management**: CRUD operations for audio files
- **Genre Management**: Music genre categorization
- **File Operations**: Upload, streaming, and storage management
- **User Management**: User profile and account operations

**Architecture Pattern:** Modular architecture with router-service-repository pattern

### 3. Data Layer

**Database (PostgreSQL):**

- **Users Table**: User accounts and authentication data
- **Audios Table**: Audio file metadata and references
- **Genres Table**: Music genre definitions
- **Audio-Genres Table**: Many-to-many relationship mapping

**File Storage (MinIO):**

- S3-compatible object storage
- Bucket-based organization
- Pre-signed URLs for secure access
- Scalable and distributed storage

## Detailed Component Architecture

### Frontend Architecture

```sh
src/
├── api/                    # API client layer
│   ├── auth.ts            # Authentication API calls
│   ├── audio.ts           # Audio management API calls
│   ├── file.ts            # File upload/download API calls
│   ├── genre.ts           # Genre management API calls
│   └── user.ts            # User management API calls
├── components/            # Reusable UI components
│   ├── ui/                # Base UI components (buttons, inputs, etc.)
│   ├── layout/            # Layout components (header, footer, navbar)
│   ├── upload-dialog.tsx  # File upload modal
│   ├── error.tsx          # Error boundary component
│   └── not-found.tsx      # 404 page component
├── routes/                # Application pages
│   ├── (auth)/            # Authentication pages
│   ├── audios/            # Audio management pages
│   ├── genres/            # Genre browsing pages
│   ├── __root.tsx         # Root layout
│   └── index.tsx          # Landing page
├── stores/                # Global state management
│   └── user.ts            # User state atom
├── utils/                 # Utility functions
│   └── auth.ts            # Authentication utilities
└── lib/                   # Shared libraries
    └── utils.ts           # Common utility functions
```

### Backend Architecture

```sh
src/
├── config/                # Configuration files
│   ├── cors.ts           # CORS configuration
│   ├── minio.ts          # MinIO storage configuration
│   ├── session.ts        # Session configuration
│   └── swagger.ts        # API documentation configuration
├── db/                   # Database layer
│   ├── index.ts          # Database connection
│   └── tables/           # Database table definitions
│       ├── user.table.ts
│       ├── audio.table.ts
│       ├── genre.table.ts
│       └── audio-genre.table.ts
├── middleware/           # Custom middleware
│   ├── authentication.ts # Authentication middleware
│   └── error-handler.ts  # Global error handling
├── modules/              # Feature modules
│   ├── auth/            # Authentication module
│   │   ├── auth.router.ts
│   │   ├── auth.service.ts
│   │   └── auth.schema.ts
│   ├── audio/           # Audio management module
│   ├── file/            # File operations module
│   ├── genre/           # Genre management module
│   └── user/            # User management module
├── services/            # Business logic services
│   └── file-storage.service.ts
├── utils/               # Utility functions
│   ├── logger.ts        # Logging utility
│   ├── pagination.ts    # Pagination helpers
│   ├── validator.ts     # Schema validation
│   └── session.ts       # Session utilities
└── types/               # TypeScript type definitions
    ├── env.d.ts         # Environment variables
    └── fastify.d.ts     # Fastify extensions
```

## Data Flow

### 1. Authentication Flow

User Action → Frontend → API Request → Backend Middleware → Database → Response

1. User submits login form
2. Frontend validates input and sends POST to `/api/auth/login`
3. Backend validates credentials against database
4. Creates secure session and returns user data
5. Frontend stores user state and redirects to dashboard

### 2. File Upload Flow

File Selection → Upload Dialog → Chunked Upload → MinIO Storage → Database
Record → UI Update

1. User selects audio file in upload dialog
2. Frontend validates file type and size
3. File is uploaded to MinIO storage via backend API
4. Backend creates database record with file metadata
5. Frontend updates UI with new audio file

### 3. Audio Streaming Flow

Play Request → Backend → MinIO Pre-signed URL → Direct Stream → Client

1. User clicks play button on audio file
2. Frontend requests stream URL from backend
3. Backend generates pre-signed URL from MinIO
4. Audio streams directly from MinIO to client
5. No backend processing for audio streaming

## Security Architecture

### Authentication & Authorization

- **Session-based Authentication**: Secure HTTP-only cookies
- **Password Security**: bcrypt hashing with salt
- **CORS Protection**: Configured for specific origins
- **Input Validation**: TypeBox schema validation on all endpoints
- **File Upload Security**: Type validation and size limits

### Data Protection

- **Database Security**: Connection pooling with credentials
- **File Storage Security**: Pre-signed URLs with expiration
- **API Security**: Rate limiting and request validation
- **Environment Security**: Secure environment variable handling

## Performance Optimizations

### Frontend Performance

- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Query Caching**: TanStack Query for efficient data fetching
- **Bundle Optimization**: Vite for optimized production builds
- **Asset Optimization**: Image compression and CDN-ready assets

### Backend Performance

- **Database Optimization**: Connection pooling and query optimization
- **Caching Strategy**: In-memory caching for frequently accessed data
- **Async Operations**: Non-blocking I/O operations
- **File Streaming**: Direct streaming from storage without server processing
- **Compression**: Response compression for API calls

## Scalability Considerations

### Horizontal Scaling

- **Stateless Backend**: Session data stored externally
- **Load Balancing**: Ready for multiple backend instances
- **Database Scaling**: Read replicas and connection pooling
- **File Storage**: Distributed MinIO cluster support

### Vertical Scaling

- **Resource Optimization**: Efficient memory and CPU usage
- **Database Indexing**: Proper indexing for query performance
- **Caching Layers**: Multiple levels of caching
- **Monitoring**: Performance monitoring and alerting

## Deployment Architecture

### Development Environment

```sh
Docker Compose:
├── PostgreSQL Container
├── MinIO Container
├── Backend Development Server
└── Frontend Development Server
```

### Production Environment

```sh
Docker Compose:
├── PostgreSQL Container (with persistent volume)
├── MinIO Container (with persistent volume)
├── Backend Container (built image)
└── Frontend Container (Nginx + built assets)
```

## API Design

### RESTful Principles

- **Resource-based URLs**: `/api/audios`, `/api/genres`
- **HTTP Methods**: GET, POST, PUT, DELETE for CRUD operations
- **Status Codes**: Proper HTTP status codes for responses
- **Error Handling**: Consistent error response format

### Schema Validation

- **TypeBox Schemas**: Runtime validation for all endpoints
- **Type Safety**: TypeScript types generated from schemas
- **Documentation**: Auto-generated Swagger documentation
- **Validation Errors**: Detailed validation error messages

## Monitoring and Logging

### Logging Strategy

- **Structured Logging**: JSON-formatted logs with Pino
- **Log Levels**: Debug, Info, Warn, Error levels
- **Request Logging**: All API requests logged with timing
- **Error Tracking**: Detailed error logging with stack traces

### Monitoring Points

- **API Performance**: Response times and error rates
- **Database Performance**: Query execution times
- **File Storage**: Upload/download speeds and errors
- **User Activity**: Authentication attempts and file operations

## Future Enhancements

### Planned Features

1. **Real-time Features**: WebSocket support for live updates
2. **Advanced Analytics**: User behavior and file usage analytics
3. **CDN Integration**: Global content delivery network
4. **Mobile App**: React Native companion app
5. **API Rate Limiting**: Advanced rate limiting and quotas
6. **Backup Strategy**: Automated backup and disaster recovery

### Architecture Evolution

1. **Microservices**: Split into dedicated services (auth, files, streaming)
2. **Event-Driven**: Message queue for async operations
3. **Caching Layer**: Redis for distributed caching
4. **Search Engine**: Elasticsearch for advanced search capabilities
5. **Notification System**: Email and push notification services

## Development Guidelines

### Code Organization

- **Modular Structure**: Clear separation of concerns
- **TypeScript**: Strict typing throughout the application
- **Error Handling**: Comprehensive error handling at all levels
- **Testing**: Unit and integration tests for critical paths
- **Documentation**: Inline documentation and API docs

### Best Practices

- **Security First**: Security considerations in all development
- **Performance Aware**: Performance impact of all changes
- **Maintainable Code**: Clean, readable, and maintainable code
- **Version Control**: Proper Git workflow and commit messages
- **Code Review**: Peer review process for all changes
