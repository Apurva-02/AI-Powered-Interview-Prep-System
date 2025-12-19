# OneselfAI Database Setup Guide

This guide will help you set up the databases locally for OneselfAI development.

## Prerequisites

- PostgreSQL 12+ installed
- MongoDB 4.4+ installed
- Node.js 18+ installed

## PostgreSQL Setup

### 1. Create Database

\`\`\`bash
createdb oneself_ai
\`\`\`

### 2. Import Schema

\`\`\`bash
psql oneself_ai < database/postgresql/schema.sql
\`\`\`

### 3. Verify Tables

\`\`\`bash
psql oneself_ai -c "\dt"
\`\`\`

## MongoDB Setup

### 1. Start MongoDB

\`\`\`bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
net start MongoDB
\`\`\`

### 2. Create Database and Collections

\`\`\`bash
mongosh
\`\`\`

Then run:

\`\`\`javascript
use oneself_ai

// Create collections with validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "name"],
      properties: {
        _id: { bsonType: "objectId" },
        name: { bsonType: "string" },
        email: { bsonType: "string" },
        password_hash: { bsonType: "string" },
        profile_picture_url: { bsonType: "string" },
        bio: { bsonType: "string" },
        phone: { bsonType: "string" },
        location: { bsonType: "string" },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
})

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ created_at: -1 })

// Repeat for other collections...
\`\`\`

## Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Update with your local database credentials:

\`\`\`env
DATABASE_URL=postgresql://user:password@localhost:5432/oneself_ai
MONGODB_URI=mongodb://localhost:27017/oneself_ai
\`\`\`

## Data Models

### Users Table
- Stores user account information
- Email is unique
- Password stored as hash

### Contact Submissions Table
- Stores contact form submissions
- Status tracking (new, read, responded)

### Pre-Interview Setup Table
- Stores interview difficulty and type selection
- Stores resume information
- Links to user account

### Interview Sessions Table
- Stores interview session data
- Links to pre-interview setup
- Stores transcript and emotion analysis

### Performance Reports Table
- Stores performance metrics
- Links to interview sessions
- Stores scores and recommendations

## API Endpoints

### Pre-Interview Setup
- `POST /api/pre-interview-setup` - Save setup
- `GET /api/pre-interview-setup?userId=xxx` - Get latest setup

### Resume Upload
- `POST /api/resume-upload` - Upload resume file

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions

### Interviews
- `POST /api/interviews` - Save interview session
- `GET /api/interviews?userId=xxx` - Get user interviews

### Performance
- `POST /api/performance` - Save performance report
- `GET /api/performance?sessionId=xxx` - Get report

## Troubleshooting

### PostgreSQL Connection Issues
\`\`\`bash
# Check if PostgreSQL is running
pg_isready

# View connection details
psql -U postgres -d oneself_ai -c "SELECT version();"
\`\`\`

### MongoDB Connection Issues
\`\`\`bash
# Check if MongoDB is running
mongosh --eval "db.adminCommand('ping')"

# View database info
mongosh --eval "use oneself_ai; db.stats()"
\`\`\`

## Backup and Restore

### PostgreSQL Backup
\`\`\`bash
pg_dump oneself_ai > backup.sql
\`\`\`

### PostgreSQL Restore
\`\`\`bash
psql oneself_ai < backup.sql
\`\`\`

### MongoDB Backup
\`\`\`bash
mongodump --db oneself_ai --out ./backup
\`\`\`

### MongoDB Restore
\`\`\`bash
mongorestore --db oneself_ai ./backup/oneself_ai
