# Audio File Hosting Platform

A modern, full-stack web application for hosting, sharing, and streaming audio
files. Built with React, TanStack Router, Fastify, and PostgreSQL.

## 🚀 Features

- **🎵 Audio Management**: Upload, organize, and manage audio files with metadata
- **🎨 Genre Classification**: Categorize audio files by genres for better organization
- **🔐 User Authentication**: Secure user registration and login system
- **📱 Responsive Design**: Modern UI built with Tailwind CSS and Radix UI components
- **⚡ Fast Streaming**: Optimized audio streaming with MinIO object storage
- **🔍 Search & Discovery**: Browse audio files by genres and metadata
- **📊 Real-time Updates**: React Query for efficient data fetching and caching
- **🛡️ Security**: Session-based authentication with secure file handling

## 🏗️ Tech Stack

### Frontend

- **React 19** - Modern React with hooks
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Jotai** - State management
- **Vite** - Fast build tool

### Backend

- **Fastify** - Fast web framework for Node.js
- **PostgreSQL** - Relational database
- **Drizzle ORM** - Type-safe database ORM
- **MinIO** - S3-compatible object storage
- **TypeBox** - Runtime type validation
- **Swagger** - API documentation
- **bcrypt** - Password hashing

### Infrastructure

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy (in production)
- **pnpm** - Package manager

## 📁 Project Structure

```sh
audio-file-hosting/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── api/            # API client functions
│   │   ├── components/     # Reusable React components
│   │   ├── routes/         # TanStack Router pages
│   │   ├── stores/         # Jotai state management
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── dist/               # Build output
├── server/                 # Fastify backend application
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── db/             # Database schemas and connection
│   │   ├── modules/        # Feature modules (auth, audio, etc.)
│   │   ├── middleware/     # Custom middleware
│   │   ├── services/       # Business logic services
│   │   └── utils/          # Utility functions
│   ├── drizzle/            # Database migrations
│   └── dist/               # Build output
├── mk/                     # Makefile utilities
├── compose.yaml            # Docker Compose configuration
└── Makefile               # Build and development commands
```

## 🚦 Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+
- Docker and Docker Compose

### Demonstration

> [!IMPORTANT]
> ensure that these ports are unoccupied: 3000, 5000, 5432, 9000, 9001

```sh
make all # this will instantiate everything from infra to application start.
```

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd audio-file-hosting
   ```

2. **Start the development environment**

   ```bash
   make dev
   ```

   This will start PostgreSQL and MinIO containers.

3. **Install dependencies**

   ```bash
   # Install server dependencies
   cd server && pnpm install

   # Install client dependencies
   cd ../client && pnpm install
   ```

4. **Set up environment variables**

   ```bash
   # Server environment (create server/.env)
   NODE_ENV=development
   DATABASE_URL=postgres://user:password@localhost:5432/web-audio
   JWT_SECRET=your-jwt-secret-here
   SESSION_SECRET=your-session-secret-here
   MINIO_ENDPOINT=localhost
   MINIO_PORT=9000
   MINIO_ACCESS_KEY=minioUser
   MINIO_SECRET_KEY=minioPassword
   CLIENT_ORIGIN=http://localhost:3000

   # Client environment (create client/.env)
   VITE_BACKEND_URL=http://localhost:5000
   ```

5. **Run database migrations**

   ```bash
   cd server && pnpm migrate
   ```

6. **Start the development servers**

   ```bash
   # Start the backend server
   cd server && pnpm dev

   # In another terminal, start the frontend
   cd client && pnpm dev
   ```

The application will be available at:

- Frontend: <http://localhost:3000>
- Backend API: <http://localhost:5000>
  - API Docs: <http://localhost:5000/docs>

## 🐳 Docker Deployment

### Full Stack Deployment

```bash
# Build and start all services
docker compose up --build

# Or use the Makefile
make dev
```

## 📝 API Documentation

The API documentation is automatically generated using Swagger and available at
`<backend_url>/docs` when running in development mode.

### Main API Endpoints

- **Authentication**
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User login
  - `POST /api/auth/logout` - User logout

- **Audio Management**
  - `GET /api/audios` - List all audio files
  - `POST /api/audios` - Upload new audio file
  - `GET /api/audios/:id` - Get audio file details
  - `PUT /api/audios/:id` - Update audio file
  - `DELETE /api/audios/:id` - Delete audio file

- **Genre Management**
  - `GET /api/genres` - List all genres
  - `POST /api/genres` - Create new genre
  - `GET /api/genres/:id` - Get genre details

- **File Operations**
  - `POST /api/files/upload` - Upload file to storage
  - `GET /api/files/:id` - Stream/download file

## 🔧 Development

### Available Scripts

**Server:**

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm migrate` - Run database migrations
- `pnpm studio` - Open Drizzle Studio (database GUI)

**Client:**

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

**Docker:**

- `make dev` - Start development environment
- `make down` - Stop all containers

### Database Schema

The application uses PostgreSQL with the following main tables:

- **users** - User accounts and authentication
- **audios** - Audio file metadata and references
- **genres** - Genre categories
- **audio_genres** - Many-to-many relationship between audios and genres

### File Storage

Audio files are stored in MinIO (S3-compatible storage) with the following structure:

- Bucket: `audio-files`
- Path: `{userId}/{audioId}/{filename}`

## 🔐 Security

- Session-based authentication using secure cookies
- Password hashing with bcrypt
- CORS protection configured for frontend origin
- Input validation using TypeBox schemas
- File upload restrictions and validation

## 🚀 Performance

- **Frontend**: Vite for fast builds, code splitting, and optimized bundles
- **Backend**: Fastify for high-performance HTTP server
- **Database**: Connection pooling and optimized queries with Drizzle ORM
- **Storage**: MinIO for scalable object storage with pre-signed URLs
- **Caching**: React Query for client-side caching and background updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🛠️ Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Ensure PostgreSQL is running: `docker compose up postgres`
   - Check DATABASE_URL in server/.env

2. **File Upload Issues**
   - Ensure MinIO is running: `docker compose up minio`
   - Check MinIO credentials in server/.env

3. **CORS Issues**
   - Verify CLIENT_ORIGIN matches your frontend URL
   - Check CORS configuration in server/src/config/cors.ts

4. **Build Issues**
   - Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
   - Check Node.js version (requires 22+)
