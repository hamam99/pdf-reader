# BookShelf — Product Requirements Document

**Version:** 2.0 | **Status:** Complete for Development | **Date:** May 2026 | **Target Launch:** Q4 2026

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Goals & Objectives](#2-goals--objectives)
3. [User Personas](#3-user-personas)
4. [Feature Requirements](#4-feature-requirements)
5. [Technical Architecture](#5-technical-architecture)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [Development Milestones](#7-development-milestones)
8. [Database Schema](#8-database-schema)
9. [Out of Scope (v1.0)](#9-out-of-scope-v10)
10. [Risks & Mitigations](#10-risks--mitigations)
11. [Success Metrics](#11-success-metrics)
12. [User Flows & Wireframes](#12-user-flows--wireframes)
13. [Resource Allocation & Team Structure](#13-resource-allocation--team-structure)
14. [Testing Strategy](#14-testing-strategy)
15. [Deployment & Operations](#15-deployment--operations)
16. [Business Model & Pricing](#16-business-model--pricing)
17. [Appendix](#17-appendix)

---

## 1. Executive Summary

BookShelf is a modern, web-based ebook reading platform that enables users to upload, read, annotate, and converse with their ebook library. The platform targets avid readers, students, and knowledge workers who need a centralized, intelligent reading environment accessible from any browser.

The platform will be built with a **React.js** frontend for a rich, responsive reading experience, a **Rust** backend for high-performance file processing and API serving, and **PostgreSQL** for reliable, relational data persistence.

### 1.1 Problem Statement

Readers today juggle multiple apps to manage their digital libraries. They use one app to read PDFs, another for EPUBs, sticky notes or external tools for annotations, and have no way to query their books intelligently. Progress tracking is manual and fragmented, making it difficult to maintain reading habits and recall where they left off.

### 1.2 Proposed Solution

BookShelf consolidates the reading experience into a single web application that supports multiple ebook formats, provides in-book annotation tools, integrates an AI chat interface per book, and automatically tracks reading progress and library status.

---

## 2. Goals & Objectives

### 2.1 Business Goals

- Launch a functional MVP within 6 months
- Achieve 1,000 active monthly readers within 3 months of launch
- Establish a foundation for premium subscription features (AI chat, cloud sync)
- Build a scalable architecture capable of supporting 100,000+ books across users

### 2.2 User Goals

- Upload and read ebooks in common formats without conversion friction
- Annotate books inline, similar to physical highlighting and margin notes
- Resume reading exactly where they left off, on any device
- Understand complex book content through AI-assisted conversation
- Maintain a clear visual picture of reading progress and library status

---

## 3. User Personas

### 3.1 The Academic Reader

| Field | Detail |
|-------|--------|
| **Name** | Aisha, 24 |
| **Occupation** | Graduate Student |
| **Goals** | Read research papers and textbooks; annotate heavily; discuss content with AI |
| **Pain Points** | Loses annotations between apps; can't search across highlights |
| **Tech Comfort** | High |

### 3.2 The Leisure Reader

| Field | Detail |
|-------|--------|
| **Name** | Marcus, 38 |
| **Occupation** | Software Engineer |
| **Goals** | Track reading list; pick up where he left off; manage to-read backlog |
| **Pain Points** | Forgets which page he was on; no unified library view |
| **Tech Comfort** | High |

### 3.3 The Casual Learner

| Field | Detail |
|-------|--------|
| **Name** | Priya, 45 |
| **Occupation** | Marketing Manager |
| **Goals** | Read business books; track progress visually; categorize books easily |
| **Pain Points** | Overwhelmed by complex reading apps; needs simple UI |
| **Tech Comfort** | Medium |

---

## 4. Feature Requirements

### Feature Summary

| ID | Feature | Description | Priority | Complexity |
|----|---------|-------------|----------|------------|
| F-01 | Ebook Upload | Upload PDF, EPUB, MOBI, and other formats with validation and storage | 🔴 High | 🔴 High |
| F-02 | Ebook Reader | In-browser reading with pagination, zoom, and responsive layout | 🔴 High | 🔴 High |
| F-03 | Annotation | Highlight text, add margin notes, and manage annotation layers | 🔴 High | 🟡 Medium |
| F-04 | AI Chat | Conversational AI interface scoped to the current book's content | 🔴 High | 🔴 High |
| F-05 | Continue Reading | Auto-save last read position and resume on next visit | 🔴 High | 🟢 Low |
| F-06 | Progress Tracking | Visual progress indicator showing percentage read per book | 🟡 Medium | 🟢 Low |
| F-07 | Book Categorization | Label books as Not Started, In Progress, or Completed | 🟡 Medium | 🟢 Low |
| F-08 | User Profile Management | Edit profile, change password, manage account settings | 🟡 Medium | 🟢 Low |
| F-09 | Search Functionality | Search across library, annotations, and book content | 🔴 High | 🟡 Medium |
| F-10 | Book Organization | Folders, tags, and collections for organizing books | 🟡 Medium | 🟡 Medium |
| F-11 | Import/Export | Import from services, export annotations to standard formats | 🟢 Low | 🔴 High |
| F-12 | Reading Statistics Dashboard | Detailed analytics and reading habit insights | 🟡 Medium | 🟡 Medium |
| F-13 | Third-party Authentication | OAuth login with Google, GitHub, etc. | 🟡 Medium | 🟡 Medium |
| F-14 | Notifications System | System notifications and reading reminders | 🟢 Low | 🟡 Medium |
| F-15 | Accessibility Features | Screen reader support, keyboard navigation, high contrast modes | 🔴 High | 🟡 Medium |

---

### 4.1 F-01: Ebook Upload

---

### 4.1 F-01: Ebook Upload

#### User Story
> As a user, I want to upload my ebook files so that I can access them from any browser without carrying files around.

#### Acceptance Criteria

- System accepts PDF, EPUB, MOBI, AZW3, and TXT file formats
- Maximum upload size is 100MB per file
- Duplicate detection warns user if the same file is uploaded again (by SHA-256 hash)
- Upload progress is shown in real-time via a progress bar
- Uploaded books appear in the library within 5 seconds of processing completion
- Invalid file types are rejected with a descriptive error message

#### Technical Notes

- Rust backend handles multipart upload via streaming to avoid memory spikes
- Files stored in object storage (S3-compatible); metadata in PostgreSQL
- EPUB conversion pipeline normalizes to a renderable internal format
- SHA-256 hash computed on upload for deduplication

---

### 4.2 F-02: Ebook Reader

#### User Story
> As a user, I want to read my ebook in the browser so that I do not need to install any additional software.

#### Acceptance Criteria

- PDF rendered page-by-page with accurate text layout
- EPUB rendered with chapter navigation and reflowable text
- Reader supports zoom in/out from 50% to 200%
- Night mode toggles between light and dark reading themes
- Keyboard navigation: arrow keys to turn pages, Escape to close
- Reader is responsive and usable on tablets and large mobile screens
- Font size adjustable for EPUB content

#### Technical Notes

- PDF.js (client-side) used for PDF rendering within the React app
- epub.js or Foliate-js for EPUB rendering
- Reader state (zoom, theme) persisted in localStorage and synced to user profile

---

### 4.3 F-03: Annotation

#### User Story
> As a user, I want to highlight passages and add notes so that I can capture my thoughts while reading.

#### Acceptance Criteria

- User can select text and choose a highlight color (yellow, green, blue, pink)
- User can add a text note to any highlight
- Annotations are visible immediately after creation
- Annotation sidebar lists all annotations for the current book
- User can edit or delete their own annotations
- Annotations persist across sessions and devices
- Annotations are page/position-aware and render in the correct location on re-open

#### Technical Notes

- Annotations stored in PostgreSQL with position anchors (page number + char offset for PDF; CFI for EPUB)
- React frontend renders highlight overlays using canvas or DOM layers on top of the reader
- Rust API exposes CRUD endpoints for annotations

---

### 4.4 F-04: AI Chat with Book

#### User Story
> As a user, I want to chat with an AI about the content of my book so that I can ask questions, get summaries, and deepen my understanding.

#### Acceptance Criteria

- Chat panel opens alongside the reader without closing the book
- AI responses are grounded in the book's actual text content
- User can ask questions, request summaries, or explore themes
- Chat history is preserved per book across sessions
- AI clearly indicates when a question is outside the scope of the book
- Response latency is under 5 seconds for typical queries

#### Technical Notes

- Book text extracted and chunked; embeddings stored via pgvector extension
- Retrieval-Augmented Generation (RAG) pipeline: user query retrieves relevant chunks, sent to LLM
- Rust backend proxies LLM API calls; streaming responses forwarded to frontend via SSE
- Conversation history stored in PostgreSQL per user per book

---

### 4.5 F-05: Continue Reading

#### User Story
> As a user, I want the app to remember my last reading position so that I can resume instantly without searching for my page.

#### Acceptance Criteria

- Last read page/position auto-saved every 30 seconds and on tab close
- Library card shows the last read date and current page
- "Continue Reading" button on the library opens the book at the exact last position
- Position syncs across devices (if user is authenticated)
- First-time opens default to page 1 / beginning

#### Technical Notes

- Reading position stored in PostgreSQL: `user_id`, `book_id`, `page_number`, `scroll_offset`, `cfi` (EPUB), `timestamp`
- Auto-save triggered via debounced page-change event on the frontend
- Rust API: `PUT /api/v1/reading-positions/:bookId`

---

### 4.6 F-06: Progress Tracking

#### User Story
> As a user, I want to see how far I have read in each book so that I can track my reading habits and stay motivated.

#### Acceptance Criteria

- Progress bar displayed on every library card showing percentage complete
- Progress percentage calculated as (pages read / total pages) × 100
- Progress updates in real time as the user reads
- Reading statistics page shows total books read, total pages read, average daily reading
- Weekly reading goal can be set (optional, measured in pages or minutes)

#### Technical Notes

- Progress derived from reading position; Rust backend recalculates on each position update
- Statistics aggregated via PostgreSQL queries; cached in Redis for performance

---

### 4.7 F-07: Book Categorization

#### User Story
> As a user, I want to label my books as Not Started, In Progress, or Completed so that I can manage my reading queue effectively.

#### Acceptance Criteria

- Each book in the library displays its current status badge
- Status automatically set to **In Progress** when user opens a book for the first time
- Status automatically set to **Completed** when progress reaches 100%
- User can manually override status via a dropdown on the library card
- Library can be filtered by status (All / Not Started / In Progress / Completed)
- Library can be sorted by title, upload date, last read date, or progress

#### Technical Notes

- Status stored as an enum column in PostgreSQL: `not_started | in_progress | completed`
- Status transitions triggered server-side on position update events
- Frontend filter/sort is client-side for responsiveness; full-library sort falls back to API query params

---

### 4.8 F-08: User Profile Management

#### User Story
> As a user, I want to manage my profile information and account settings so that I can keep my account up-to-date and secure.

#### Acceptance Criteria

- User can view and edit display name, email address, and avatar
- User can change password with current password verification
- User can set preferred reading theme (light/dark/sepia) and default font size
- User can set weekly reading goals in pages or minutes
- User can view and manage active sessions across devices
- User can delete their account with confirmation and data removal
- Profile changes are saved immediately with visual feedback

#### Technical Notes

- Password changes require Argon2id re-hashing on the Rust backend
- Email changes require verification before becoming active
- Session management via refresh_tokens table with device hints
- Account deletion triggers cascading delete across all user tables

---

### 4.9 F-09: Search Functionality

#### User Story
> As a user, I want to search across my library, annotations, and book content so that I can quickly find information I need.

#### Acceptance Criteria

- Global search bar accessible from all pages
- Search across book titles, authors, and metadata
- Search within annotation notes and highlighted text
- Full-text search within book content (PDF/EPUB text)
- Search results categorized by type (Books, Annotations, Content)
- Search filters by book status, date range, and file format
- Real-time search suggestions as user types
- Search history with quick access to recent queries

#### Technical Notes

- PostgreSQL full-text search with tsvector columns for book content
- Separate search index for annotations with position context
- Search suggestions powered by Redis cache for performance
- Search results paginated with 20 items per page

---

### 4.10 F-10: Book Organization

#### User Story
> As a user, I want to organize my books into folders, tags, and collections so that I can manage my reading library effectively.

#### Acceptance Criteria

- User can create, rename, and delete folders/categories
- User can assign multiple tags to each book
- User can create custom collections (e.g., "Summer Reading", "Research Papers")
- Drag-and-drop interface for organizing books into folders
- Bulk operations for tagging multiple books at once
- Nested folder structure support (up to 3 levels deep)
- Quick filter by tags or collections in library view
- Export organization structure as JSON for backup

#### Technical Notes

- Many-to-many relationships: books ↔ tags, books ↔ collections
- Folder hierarchy stored with adjacency list or materialized path
- Bulk operations use PostgreSQL array operations for efficiency
- Organization data synced in real-time via WebSocket or polling

---

### 4.11 F-11: Import/Export

#### User Story
> As a user, I want to import books from other services and export my annotations so that I can migrate data and maintain backups.

#### Acceptance Criteria

- Import books from Kindle, Goodreads, or Calibre via CSV/JSON
- Import annotations from PDF readers (Adobe, Foxit) in standard formats
- Export annotations as PDF with embedded notes (PDF/A standard)
- Export annotations as Markdown, HTML, or plain text
- Export reading statistics as CSV for personal analytics
- Batch export all user data as a ZIP archive (GDPR compliance)
- Import progress shown with validation errors highlighted
- Export formats preserve metadata and timestamps

#### Technical Notes

- Import pipeline validates and normalizes data before insertion
- PDF annotation export uses PDF.js annotation layer rendering
- Batch exports processed asynchronously with email notification
- Data retention policies: exports kept for 30 days then auto-deleted

---

### 4.12 F-12: Reading Statistics Dashboard

#### User Story
> As a user, I want detailed analytics about my reading habits so that I can track progress and improve my reading routine.

#### Acceptance Criteria

- Dashboard with key metrics: total books read, pages read, reading time
- Weekly/Monthly/Yearly reading trends with interactive charts
- Reading speed analysis (pages/hour, words/minute)
- Most productive reading times of day/week
- Genre/author breakdown of reading habits
- Goal tracking with progress visualization
- Comparison to previous periods (week-over-week, month-over-month)
- Export statistics as PDF report or CSV data

#### Technical Notes

- Statistics computed daily via scheduled Rust jobs
- Data aggregated in reading_stats table with materialized views
- Charts rendered with Recharts or similar React charting library
- Cached statistics in Redis for dashboard performance

---

### 4.13 F-13: Third-party Authentication

#### User Story
> As a user, I want to sign in with my existing accounts (Google, GitHub) so that I can avoid creating another password.

#### Acceptance Criteria

- OAuth2 login with Google, GitHub, and Microsoft accounts
- Seamless account linking (add OAuth to existing email/password account)
- Profile information auto-populated from OAuth provider
- Graceful handling of OAuth provider outages or errors
- Clear privacy policy about data usage from third-party providers
- Ability to unlink OAuth providers from account settings
- Support for multiple OAuth providers per user account

#### Technical Notes

- OAuth flow handled by Rust backend with secure state tokens
- User identities mapped via email address with conflict resolution
- JWT tokens issued after OAuth validation same as email/password flow
- OAuth provider configurations stored in environment variables

---

### 4.14 F-14: Notifications System

#### User Story
> As a user, I want to receive notifications about reading reminders and system updates so that I can stay engaged with my reading goals.

#### Acceptance Criteria

- Daily/weekly reading reminder notifications
- Notification when books finish processing after upload
- System announcements for new features or maintenance
- Notification preferences per notification type
- In-app notification center with read/unread status
- Email notifications for important account events
- Push notifications for mobile browsers (if supported)
- Notification frequency controls (immediate/daily digest/off)

#### Technical Notes

- Notification queue processed by background Rust workers
- WebSocket for real-time in-app notifications
- Email notifications via SMTP or transactional email service
- Notification preferences stored in user_preferences table

---

### 4.15 F-15: Accessibility Features

#### User Story
> As a user with accessibility needs, I want the application to be fully accessible so that I can read and interact with my books independently.

#### Acceptance Criteria

- WCAG 2.1 AA compliance for all UI components
- Full keyboard navigation support (Tab, Arrow keys, Enter, Escape)
- Screen reader compatibility with proper ARIA labels
- High contrast mode toggle for low vision users
- Adjustable text spacing and line height controls
- Reduced motion preferences for animations
- Voice control compatibility (VoiceOver, TalkBack, NVDA)
- Accessibility testing with automated and manual audits

#### Technical Notes

- Accessibility testing integrated into CI/CD pipeline
- ARIA attributes added dynamically via React components
- Keyboard navigation managed with custom React hooks
- High contrast CSS variables for theme switching
- Regular accessibility audits with user testing

---

## 5. Technical Architecture

### 5.1 Stack Overview

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | React.js 18 + TypeScript | Component model ideal for complex reader UI; large ecosystem |
| State Management | Zustand / React Query | Lightweight global state + server-state caching |
| PDF Rendering | PDF.js (Mozilla) | Battle-tested, runs entirely in browser |
| EPUB Rendering | epub.js / Foliate-js | Open-source, supports reflowable text and CFI positions |
| Backend API | Rust (Axum framework) | Memory safety, high throughput, low latency for file processing |
| Database | PostgreSQL 16 | ACID compliance, pgvector extension for AI embeddings |
| File Storage | S3-compatible (MinIO or AWS S3) | Scalable object storage for ebook files |
| AI / LLM | OpenAI API or self-hosted (Ollama) | GPT-4o for accuracy; Ollama for on-premise option |
| Vector Search | pgvector (PostgreSQL extension) | Keeps vector search co-located with relational data |
| Auth | JWT + Refresh Tokens | Stateless auth; Rust middleware validates tokens |
| Cache | Redis | Session data, reading statistics aggregation |

### 5.2 System Architecture Overview

The system follows a three-tier architecture with a React SPA communicating with a Rust REST/SSE API, which in turn reads from PostgreSQL and writes to object storage.

- **Frontend (React SPA):** Served from CDN. Handles rendering, state, and real-time chat via SSE
- **API Layer (Rust / Axum):** Stateless REST API. Handles auth, file ingestion, annotation CRUD, position sync, and LLM proxying
- **Data Layer (PostgreSQL + Redis + S3):** PostgreSQL for all relational data and pgvector embeddings; Redis for caching; S3 for binary ebook files

### 5.3 API Endpoints

#### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/v1/auth/register` | None | Register a new user account |
| `POST` | `/api/v1/auth/login` | None | Authenticate and receive JWT tokens |
| `POST` | `/api/v1/auth/refresh` | Refresh Token | Obtain a new access token |
| `POST` | `/api/v1/auth/logout` | Bearer JWT | Invalidate refresh token |

#### Books

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/v1/books` | Bearer JWT | List all books in user library with status and progress |
| `POST` | `/api/v1/books` | Bearer JWT | Upload a new ebook (multipart/form-data) |
| `GET` | `/api/v1/books/:id` | Bearer JWT | Get book metadata and reading position |
| `DELETE` | `/api/v1/books/:id` | Bearer JWT | Remove book and associated data |
| `PATCH` | `/api/v1/books/:id/status` | Bearer JWT | Manually update book reading status |

#### Reading & Progress

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/v1/reading-positions/:bookId` | Bearer JWT | Get last saved reading position |
| `PUT` | `/api/v1/reading-positions/:bookId` | Bearer JWT | Save or update reading position |
| `GET` | `/api/v1/stats` | Bearer JWT | Get reading statistics and weekly summary |

#### Annotations

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/v1/annotations/:bookId` | Bearer JWT | List all annotations for a book |
| `POST` | `/api/v1/annotations/:bookId` | Bearer JWT | Create a new annotation |
| `PUT` | `/api/v1/annotations/:id` | Bearer JWT | Update annotation note or color |
| `DELETE` | `/api/v1/annotations/:id` | Bearer JWT | Delete an annotation |

#### AI Chat

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/v1/chat/:bookId/history` | Bearer JWT | Retrieve chat history for a book |
| `POST` | `/api/v1/chat/:bookId/message` | Bearer JWT | Send user message; streams AI response via SSE |

---

## 6. Non-Functional Requirements

### 6.1 Performance

- Book upload processing completes within 30 seconds for files up to 100MB
- Page render time under 500ms for PDF pages on a standard connection
- API response time under 200ms at p95 for non-streaming endpoints
- AI chat first token streamed within 2 seconds of message submission

### 6.2 Scalability

- Rust API horizontally scalable behind a load balancer
- PostgreSQL with read replicas for read-heavy workloads
- File storage (S3) scales independently from compute
- Target: support 10,000 concurrent readers without degradation

### 6.3 Security

- All data in transit encrypted with TLS 1.3
- Ebook files stored with server-side encryption in S3
- JWT tokens expire after 15 minutes; refresh tokens after 30 days
- Input validation and SQL injection prevention enforced at Rust API layer
- Rate limiting: 100 requests/minute per user; 10 AI chat messages/minute
- Users can only access their own books and annotations (row-level security in PostgreSQL)

### 6.4 Accessibility

- WCAG 2.1 AA compliance for all UI components
- Keyboard-navigable reader and library
- Screen reader support for book metadata and library cards
- Color contrast ratios meet AA standards in both light and dark mode

### 6.5 Reliability & Availability

- Target uptime: 99.5% (excluding planned maintenance)
- Daily database backups with 30-day retention
- Graceful degradation: reader remains functional if AI chat is unavailable

---

## 7. Development Milestones

| Phase | Timeline | Deliverables | Status |
|-------|----------|--------------|--------|
| Phase 1 | Weeks 1–3 | Project setup, DB schema, auth API (Rust), login/signup UI (React) | Planned |
| Phase 2 | Weeks 4–7 | File upload pipeline, PDF rendering, EPUB rendering, library view | Planned |
| Phase 3 | Weeks 8–10 | Reading position sync, progress tracking, book categorization | Planned |
| Phase 4 | Weeks 11–13 | Annotation creation, highlight overlay, annotation sidebar | Planned |
| Phase 5 | Weeks 14–16 | AI chat RAG pipeline, embedding ingestion, chat UI + SSE | Planned |
| Phase 6 | Weeks 17–18 | Performance optimization, accessibility audit, security review | Planned |
| Phase 7 | Weeks 19–20 | Beta testing, bug fixes, documentation, staging deployment | Planned |
| Launch | Week 21+ | Production deployment, monitoring setup, v1.0 release | Planned |

---

## 8. Database Schema

All relational data is stored in **PostgreSQL 16**. The `pgvector` extension is enabled for AI embedding storage. Row-Level Security (RLS) is enforced so each user can only access their own rows.

### 8.1 Entity Overview

| Table | Purpose | Key Relationships |
|-------|---------|-------------------|
| `users` | Registered user accounts and preferences | Parent of all other tables via `user_id` |
| `books` | Ebook metadata, file reference, and reading status | Belongs to `users`; parent of most tables |
| `reading_positions` | Last read position per user per book | Belongs to `users` and `books` (1-to-1) |
| `annotations` | Highlights and margin notes per page | Belongs to `users` and `books` |
| `chat_messages` | AI conversation history per book per user | Belongs to `users` and `books` |
| `book_embeddings` | Text chunks and vector embeddings for RAG | Belongs to `books` only |
| `reading_stats` | Daily reading activity log for analytics | Belongs to `users` and `books` |
| `refresh_tokens` | Issued refresh tokens for auth rotation | Belongs to `users` |

---

### 8.2 Table: `users`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `UUID` | PK, DEFAULT gen_random_uuid() | Unique user identifier |
| `email` | `VARCHAR(320)` | NOT NULL, UNIQUE | Email address used for login |
| `password_hash` | `TEXT` | NOT NULL | Argon2id hashed password |
| `display_name` | `VARCHAR(100)` | NOT NULL | Name shown in the UI |
| `avatar_url` | `TEXT` | NULL | Optional profile picture URL |
| `preferred_theme` | `VARCHAR(10)` | DEFAULT 'light' | Reader theme: `light` \| `dark` \| `sepia` |
| `default_font_size` | `SMALLINT` | DEFAULT 16 | EPUB reader default font size in px |
| `weekly_goal_pages` | `SMALLINT` | DEFAULT 0 | Optional weekly reading goal (0 = off) |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | Account creation timestamp |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | Last profile update timestamp |

**Indexes:**
```sql
CREATE UNIQUE INDEX ON users (LOWER(email));
```

---

### 8.3 Table: `books`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `UUID` | PK, DEFAULT gen_random_uuid() | Unique book identifier |
| `user_id` | `UUID` | NOT NULL, FK → users(id) ON DELETE CASCADE | Owner of this book |
| `title` | `VARCHAR(500)` | NOT NULL | Book title (extracted or user-provided) |
| `author` | `VARCHAR(300)` | NULL | Author name(s) |
| `file_key` | `TEXT` | NOT NULL, UNIQUE | S3 object key for the ebook file |
| `file_format` | `VARCHAR(10)` | NOT NULL | Format: `pdf` \| `epub` \| `mobi` \| `txt` |
| `file_size_bytes` | `BIGINT` | NOT NULL | File size in bytes |
| `file_hash_sha256` | `CHAR(64)` | NOT NULL | SHA-256 hash for deduplication |
| `cover_image_key` | `TEXT` | NULL | S3 key for extracted cover image |
| `total_pages` | `INTEGER` | NULL | Total pages (set after processing) |
| `total_words` | `INTEGER` | NULL | Approximate word count |
| `status` | `book_status` | NOT NULL, DEFAULT 'not_started' | Enum: `not_started` \| `in_progress` \| `completed` |
| `processing_state` | `processing_state` | NOT NULL, DEFAULT 'pending' | Enum: `pending` \| `processing` \| `ready` \| `failed` |
| `uploaded_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | Upload timestamp |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | Last metadata update |

**Enums:**
```sql
CREATE TYPE book_status AS ENUM ('not_started', 'in_progress', 'completed');
CREATE TYPE processing_state AS ENUM ('pending', 'processing', 'ready', 'failed');
```

**Indexes:**
```sql
CREATE INDEX ON books (user_id);
CREATE INDEX ON books (user_id, status);
CREATE UNIQUE INDEX ON books (user_id, file_hash_sha256);
```

---

### 8.4 Table: `reading_positions`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `UUID` | PK, DEFAULT gen_random_uuid() | Unique position record |
| `user_id` | `UUID` | NOT NULL, FK → users(id) ON DELETE CASCADE | Reader user |
| `book_id` | `UUID` | NOT NULL, FK → books(id) ON DELETE CASCADE | Book being read |
| `page_number` | `INTEGER` | NOT NULL, DEFAULT 1 | Current page (1-indexed, for PDF) |
| `scroll_offset_px` | `INTEGER` | NOT NULL, DEFAULT 0 | Vertical scroll offset within the page |
| `cfi` | `TEXT` | NULL | EPUB Canonical Fragment Identifier for position |
| `progress_pct` | `NUMERIC(5,2)` | NOT NULL, DEFAULT 0.00 | Reading progress 0.00–100.00 |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | Auto-updated on every position save |

**Constraints & Indexes:**
```sql
ALTER TABLE reading_positions ADD CONSTRAINT uq_user_book UNIQUE (user_id, book_id);
CREATE INDEX ON reading_positions (user_id, updated_at DESC);
ALTER TABLE reading_positions ADD CONSTRAINT chk_progress CHECK (progress_pct >= 0 AND progress_pct <= 100);
```

---

### 8.5 Table: `annotations`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `UUID` | PK, DEFAULT gen_random_uuid() | Unique annotation identifier |
| `user_id` | `UUID` | NOT NULL, FK → users(id) ON DELETE CASCADE | User who created the annotation |
| `book_id` | `UUID` | NOT NULL, FK → books(id) ON DELETE CASCADE | Book the annotation belongs to |
| `page_number` | `INTEGER` | NOT NULL | Page where annotation appears (PDF) |
| `cfi_start` | `TEXT` | NULL | EPUB CFI for start of highlighted range |
| `cfi_end` | `TEXT` | NULL | EPUB CFI for end of highlighted range |
| `char_offset_start` | `INTEGER` | NULL | Character offset start within page text (PDF) |
| `char_offset_end` | `INTEGER` | NULL | Character offset end within page text (PDF) |
| `selected_text` | `TEXT` | NOT NULL | The highlighted passage text |
| `note_text` | `TEXT` | NULL | Optional user-written note / comment |
| `highlight_color` | `VARCHAR(10)` | NOT NULL, DEFAULT 'yellow' | Color: `yellow` \| `green` \| `blue` \| `pink` |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | When annotation was created |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | Last edit timestamp |

**Indexes:**
```sql
CREATE INDEX ON annotations (book_id, user_id);
CREATE INDEX ON annotations (user_id, created_at DESC);
ALTER TABLE annotations ADD CONSTRAINT chk_color CHECK (highlight_color IN ('yellow','green','blue','pink'));
```

---

### 8.6 Table: `chat_messages`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `UUID` | PK, DEFAULT gen_random_uuid() | Unique message identifier |
| `user_id` | `UUID` | NOT NULL, FK → users(id) ON DELETE CASCADE | User in this conversation |
| `book_id` | `UUID` | NOT NULL, FK → books(id) ON DELETE CASCADE | Book the chat is about |
| `role` | `message_role` | NOT NULL | Sender: `user` \| `assistant` |
| `content` | `TEXT` | NOT NULL | Message content (plain text or markdown) |
| `token_count` | `INTEGER` | NULL | Approximate tokens used (for billing tracking) |
| `feedback` | `SMALLINT` | NULL | User feedback: `1` = positive, `-1` = negative |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | Message creation timestamp |

**Enums & Indexes:**
```sql
CREATE TYPE message_role AS ENUM ('user', 'assistant');
CREATE INDEX ON chat_messages (book_id, user_id, created_at);
ALTER TABLE chat_messages ADD CONSTRAINT chk_feedback CHECK (feedback IN (-1, 1) OR feedback IS NULL);
```

---

### 8.7 Table: `book_embeddings`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `UUID` | PK, DEFAULT gen_random_uuid() | Unique embedding record identifier |
| `book_id` | `UUID` | NOT NULL, FK → books(id) ON DELETE CASCADE | Book this chunk belongs to |
| `chunk_index` | `INTEGER` | NOT NULL | Sequential chunk number within the book |
| `page_number` | `INTEGER` | NULL | Page where this chunk starts (PDF) |
| `cfi_start` | `TEXT` | NULL | EPUB CFI for start of chunk |
| `chunk_text` | `TEXT` | NOT NULL | Raw text of this chunk (~500 tokens) |
| `embedding` | `VECTOR(1536)` | NOT NULL | OpenAI text-embedding-3-small vector |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | When embedding was generated |

**Indexes:**
```sql
ALTER TABLE book_embeddings ADD CONSTRAINT uq_book_chunk UNIQUE (book_id, chunk_index);
CREATE INDEX ON book_embeddings USING hnsw (embedding vector_cosine_ops);
```

---

### 8.8 Table: `reading_stats`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `UUID` | PK, DEFAULT gen_random_uuid() | Unique stat entry identifier |
| `user_id` | `UUID` | NOT NULL, FK → users(id) ON DELETE CASCADE | User whose stats are recorded |
| `book_id` | `UUID` | NOT NULL, FK → books(id) ON DELETE CASCADE | Book read during this session |
| `date` | `DATE` | NOT NULL, DEFAULT CURRENT_DATE | Calendar date of reading activity |
| `pages_read` | `SMALLINT` | NOT NULL, DEFAULT 0 | Pages read during this day for this book |
| `minutes_read` | `SMALLINT` | NOT NULL, DEFAULT 0 | Estimated minutes spent reading |
| `session_count` | `SMALLINT` | NOT NULL, DEFAULT 1 | Number of reading sessions on this date |

**Indexes:**
```sql
ALTER TABLE reading_stats ADD CONSTRAINT uq_user_book_date UNIQUE (user_id, book_id, date);
CREATE INDEX ON reading_stats (user_id, date DESC);
```

---

### 8.9 Table: `refresh_tokens`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `UUID` | PK, DEFAULT gen_random_uuid() | Unique token record identifier |
| `user_id` | `UUID` | NOT NULL, FK → users(id) ON DELETE CASCADE | Owning user |
| `token_hash` | `CHAR(64)` | NOT NULL, UNIQUE | SHA-256 of the raw refresh token |
| `device_hint` | `VARCHAR(200)` | NULL | Optional device/browser label for UX |
| `issued_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | Token issuance time |
| `expires_at` | `TIMESTAMPTZ` | NOT NULL | Expiry time (issued_at + 30 days) |
| `revoked_at` | `TIMESTAMPTZ` | NULL | Set on logout or token rotation |

**Maintenance:**
- Expired and revoked tokens purged by a nightly scheduled Rust job:
```sql
DELETE FROM refresh_tokens WHERE expires_at < NOW() OR revoked_at IS NOT NULL;
```

---

### 8.10 Row-Level Security & Migration Strategy

#### Row-Level Security (RLS)

RLS is enabled on every user-scoped table. A standard policy ensures authenticated users can only access their own rows:

```sql
-- Enable RLS (repeat for each user-scoped table)
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE annotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE refresh_tokens ENABLE ROW LEVEL SECURITY;

-- Standard isolation policy
CREATE POLICY user_isolation ON books
  USING (user_id = current_setting('app.user_id')::UUID);
```

> `book_embeddings` is not user-scoped — access is controlled via the `books` FK and application-layer authorization checks.

#### Migration Strategy

- Migrations managed with **sqlx migrate** (Rust-native, version-controlled SQL files)
- Each migration file named: `YYYYMMDDHHMMSS_description.sql`
- Migrations applied automatically on Rust API startup in non-production environments
- Production migrations gated by CI pipeline approval step
- Rollback scripts provided for every forward migration

---

## 9. Out of Scope (v1.0)

- Social features: sharing annotations, reading lists, or reviews publicly
- Native mobile applications (iOS / Android)
- Offline reading mode / service worker caching of book content
- DRM-protected ebook support
- Real-time collaborative reading or shared annotation
- Built-in ebook store or marketplace
- Text-to-speech / audio narration
- OCR for scanned image-based PDFs (non-selectable text)

---

## 10. Risks & Mitigations

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| EPUB format variations cause rendering bugs | 🔴 High | Use well-maintained open-source renderers; maintain compatibility test suite with varied EPUB samples |
| LLM API costs exceed budget at scale | 🟡 Medium | Implement per-user monthly AI query limits; evaluate self-hosted Ollama models for cost reduction |
| Large PDF uploads cause backend memory spikes | 🟡 Medium | Stream uploads in Rust; process pages lazily; set strict file size limits |
| pgvector query latency for large books | 🟢 Low | Index embeddings with HNSW; limit chunk retrieval to top-k=5; cache frequent queries |
| User data breach | 🟢 Low | Row-level security in PostgreSQL; encryption at rest and in transit; regular security audits |

---

## 11. Success Metrics

### 11.1 Launch Metrics (Month 1)

- 1,000 registered users within 4 weeks of launch
- 500 books uploaded across all users in first month
- Less than 2% upload failure rate
- Average session duration greater than 20 minutes

### 11.2 Engagement Metrics (Month 3)

- 30-day retention rate above 40%
- 50% of active users use annotation feature at least once per week
- Average of 3+ AI chat sessions per active user per week
- 80% of users who open a book return to it within 7 days (Continue Reading efficacy)

### 11.3 Technical Metrics

- API p95 latency under 200ms for non-streaming endpoints
- Zero critical security vulnerabilities in monthly scans
- System uptime of 99.5% or higher
- AI chat satisfaction rating (thumbs up/down) above 80% positive

---

## 12. User Flows & Wireframes

### 12.1 Core User Flows

#### 12.1.1 Onboarding Flow
1. User visits BookShelf website
2. User registers via email/password or OAuth (Google/GitHub)
3. User completes profile setup (optional)
4. User is directed to empty library with upload prompt
5. User uploads first book and begins reading

#### 12.1.2 Reading Flow
1. User selects book from library
2. Reader opens at last saved position
3. User reads with navigation controls
4. User highlights text and adds annotations
5. User opens AI chat to ask questions
6. Reading position auto-saves periodically
7. User closes reader, returns to library

#### 12.1.3 Library Management Flow
1. User views library with filter/sort options
2. User creates folders/tags for organization
3. User imports books from external sources
4. User exports annotations for backup
5. User views reading statistics dashboard

### 12.2 Wireframe References

#### 12.2.1 Library View
- Grid layout of book cards with cover images
- Each card shows: title, author, progress bar, status badge
- Top navigation: search bar, upload button, user menu
- Sidebar filters: status, tags, folders, date ranges
- Responsive design for mobile/tablet/desktop

#### 12.2.2 Reader View
- Main content area: book pages with rendering
- Left sidebar: chapter navigation (EPUB) or page thumbnails (PDF)
- Right sidebar: annotation list and AI chat panel
- Top toolbar: zoom controls, theme toggle, annotation tools
- Bottom toolbar: page navigation, progress indicator

#### 12.2.3 Annotation Interface
- Text selection triggers highlight color palette
- Click on highlight opens note editor
- Annotation sidebar shows all notes with page references
- Filter annotations by color, date, or search terms
- Export annotations as PDF/Markdown/HTML

#### 12.2.4 AI Chat Interface
- Chat panel opens alongside reader
- Message history with user/AI turns
- Streaming responses with typing indicator
- Suggested questions based on book content
- Feedback buttons (thumbs up/down) for responses

---

## 13. Resource Allocation & Team Structure

### 13.1 Core Team Composition

| Role | Count | Responsibilities | Key Skills |
|------|-------|------------------|------------|
| Product Manager | 1 | PRD ownership, roadmap, stakeholder alignment | Product strategy, user research, agile methodology |
| Frontend Engineer | 2 | React UI, reader components, state management | React.js, TypeScript, Tailwind CSS, PDF.js/epub.js |
| Backend Engineer | 2 | Rust API, file processing, database design | Rust, PostgreSQL, AWS/S3, API design |
| AI/ML Engineer | 1 | RAG pipeline, embeddings, LLM integration | Python, vector databases, OpenAI API, prompt engineering |
| UX/UI Designer | 1 | Wireframes, design system, accessibility | Figma, WCAG, user testing, design systems |
| DevOps Engineer | 1 | Infrastructure, CI/CD, monitoring | Docker, Kubernetes, AWS, monitoring tools |
| QA Engineer | 1 | Testing strategy, automation, bug tracking | Test automation, manual testing, performance testing |

### 13.2 Resource Allocation by Phase

#### Phase 1-2 (Weeks 1-7): Foundation
- Frontend: 2 engineers (100%)
- Backend: 2 engineers (100%)
- Design: 1 designer (50%)
- Total: 5 FTE

#### Phase 3-5 (Weeks 8-16): Core Features
- Frontend: 2 engineers (100%)
- Backend: 2 engineers (100%)
- AI/ML: 1 engineer (100%)
- Design: 1 designer (50%)
- QA: 1 engineer (50%)
- Total: 6.5 FTE

#### Phase 6-7 (Weeks 17-20): Polish & Launch
- Frontend: 2 engineers (100%)
- Backend: 1 engineer (100%)
- AI/ML: 1 engineer (50%)
- DevOps: 1 engineer (100%)
- QA: 1 engineer (100%)
- Total: 5.5 FTE

### 13.3 External Resources & Tools

| Resource | Purpose | Cost Estimate |
|----------|---------|---------------|
| AWS EC2/RDS/S3 | Hosting, database, file storage | $800-1,200/month |
| OpenAI API | LLM queries for AI chat | $500-1,000/month (scaling) |
| Sentry | Error monitoring & performance | $29/month (Team plan) |
| Figma | Design collaboration | $12/editor/month |
| GitHub Teams | Code repository & CI/CD | $4/user/month |
| Slack | Team communication | $8.75/user/month |
| **Total Monthly** | **Operational Costs** | **~$1,400-2,300/month** |

---

## 14. Testing Strategy

### 14.1 Testing Pyramid

#### 14.1.1 Unit Tests (60% coverage)
- **Frontend**: React components, hooks, utilities
- **Backend**: Rust API endpoints, business logic, file processing
- **AI Pipeline**: Embedding generation, RAG retrieval logic
- **Tools**: Jest (React), cargo test (Rust), pytest (Python)

#### 14.1.2 Integration Tests (30% coverage)
- API endpoint integration (Rust + PostgreSQL)
- File upload and processing pipeline
- Authentication flow (JWT + refresh tokens)
- AI chat SSE streaming integration
- **Tools**: sqlx-test, Postman, Newman

#### 14.1.3 End-to-End Tests (10% coverage)
- Complete user flows: registration → upload → read → annotate → chat
- Cross-browser compatibility testing
- Mobile responsiveness testing
- Accessibility compliance testing
- **Tools**: Playwright, Cypress, BrowserStack

### 14.2 Testing Environments

| Environment | Purpose | Data | Access |
|-------------|---------|------|--------|
| **Local** | Developer testing | Mock data | Developers only |
| **CI/CD** | Automated test runs | Test fixtures | CI pipeline |
| **Staging** | Pre-production validation | Scaled test data | Team + stakeholders |
| **Production** | Live monitoring | Real user data | All users |

### 14.3 Quality Gates

#### 14.3.1 Code Quality
- ESLint/Prettier for frontend code
- Clippy for Rust code quality
- Minimum 80% test coverage for critical paths
- Zero critical security vulnerabilities

#### 14.3.2 Performance Gates
- API response time < 200ms (p95)
- Page load time < 3 seconds (LCP)
- Core Web Vitals: Good scores
- Memory usage within limits

#### 14.3.3 Accessibility Gates
- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation completeness
- Color contrast ratios

### 14.4 Test Automation Pipeline

1. **Pre-commit**: Linting, formatting, unit tests
2. **Pull Request**: Integration tests, security scans
3. **Merge to Main**: Full test suite, performance benchmarks
4. **Staging Deployment**: E2E tests, accessibility audits
5. **Production Deployment**: Canary testing, monitoring alerts

---

## 15. Deployment & Operations

### 15.1 Infrastructure Architecture

#### 15.1.1 Production Environment
- **Frontend**: Vercel/Netlify for React SPA (CDN global distribution)
- **Backend**: AWS ECS Fargate containers (auto-scaling)
- **Database**: AWS RDS PostgreSQL (Multi-AZ for HA)
- **File Storage**: AWS S3 with lifecycle policies
- **Cache**: AWS ElastiCache Redis
- **CDN**: CloudFront for static assets

#### 15.1.2 Monitoring Stack
- **Application Metrics**: Prometheus + Grafana
- **Logging**: AWS CloudWatch Logs + structured logging
- **APM**: Sentry for error tracking
- **Uptime**: Pingdom for external monitoring
- **Security**: AWS GuardDuty + regular vulnerability scans

### 15.2 Deployment Strategy

#### 15.2.1 CI/CD Pipeline
1. **Source**: GitHub repository with branch protection
2. **Build**: Docker container builds for Rust backend
3. **Test**: Automated test suite execution
4. **Scan**: Security vulnerability scanning
5. **Deploy**: Blue-green deployment to staging
6. **Verify**: Automated smoke tests
7. **Promote**: Gradual rollout to production

#### 15.2.2 Release Cadence
- **Weekly**: Minor features and bug fixes
- **Monthly**: Major feature releases
- **Quarterly**: Platform updates and architecture improvements

### 15.3 Disaster Recovery

#### 15.3.1 Backup Strategy
- **Database**: Daily automated backups with 30-day retention
- **File Storage**: S3 versioning enabled for all ebook files
- **Configuration**: Infrastructure as Code (Terraform) in version control
- **Recovery Point Objective (RPO)**: 24 hours
- **Recovery Time Objective (RTO)**: 4 hours

#### 15.3.2 High Availability
- Multi-AZ database deployment
- Auto-scaling backend services
- Global CDN for frontend assets
- Load balancer with health checks
- Circuit breakers for dependent services

### 15.4 Operational Procedures

#### 15.4.1 Incident Response
1. **Detection**: Monitoring alerts trigger pager duty
2. **Triage**: On-call engineer assesses severity
3. **Containment**: Immediate mitigation actions
4. **Resolution**: Root cause analysis and fix
5. **Post-mortem**: Documentation and process improvement

#### 15.4.2 Capacity Planning
- Monthly review of usage trends
- Quarterly capacity forecasting
- Auto-scaling thresholds adjustment
- Cost optimization analysis

---

## 16. Business Model & Pricing

### 16.1 Revenue Model

#### 16.1.1 Freemium Tier
- **Target**: Casual readers, students, early adopters
- **Features**:
  - Upload up to 10 books
  - Basic annotation tools
  - Limited AI chat (50 messages/month)
  - 1GB storage limit
  - Community support
- **Price**: Free

#### 16.1.2 Pro Tier
- **Target**: Avid readers, professionals, academics
- **Features**:
  - Unlimited book uploads
  - Advanced annotation tools
  - Unlimited AI chat
  - 10GB storage
  - Priority support
  - Export capabilities
  - Reading statistics dashboard
- **Price**: $9.99/month or $99/year (17% discount)

#### 16.1.3 Team Tier
- **Target**: Educational institutions, research teams, companies
- **Features**:
  - All Pro features
  - Team management dashboard
  - Shared libraries and annotations
  - Custom storage limits
  - SSO integration
  - Dedicated account manager
- **Price**: $29/user/month (minimum 5 users)

### 16.2 Market Analysis

#### 16.2.1 Target Market Size
- **Global ebook market**: $18.13 billion (2023), growing at 4.9% CAGR
- **Digital readers**: ~1.2 billion globally
- **Addressable market**: ~50 million serious digital readers
- **Initial target**: 100,000 users in first year

#### 16.2.2 Competitive Landscape
- **Adobe Acrobat**: PDF-focused, expensive, no AI features
- **Kindle Cloud Reader**: Limited formats, Amazon ecosystem lock-in
- **Google Play Books**: Basic features, no advanced annotations
- **Calibre**: Desktop-only, complex UI, no cloud sync
- **MarginNote**: iOS-focused, limited platform support

### 16.3 Growth Strategy

#### 16.3.1 User Acquisition
- **Content Marketing**: Blog posts about reading techniques, ebook formats
- **SEO**: Target keywords: "online pdf reader", "epub web reader", "annotate ebooks"
- **Partnerships**: Educational institutions, book clubs, author communities
- **Referral Program**: Free month for both referrer and referee

#### 16.3.2 Monetization Timeline
- **Months 1-3**: Free beta, gather feedback, build user base
- **Months 4-6**: Introduce Pro tier, early adopter discounts
- **Months 7-12**: Refine pricing, introduce Team tier
- **Year 2**: Expand feature set, enterprise offerings

### 16.4 Financial Projections

#### 16.4.1 Year 1 Projections
- **Total Users**: 100,000
- **Conversion Rate**: 5% to paid tiers
- **Monthly Revenue**: ~$50,000 (5,000 paid users × $10 average)
- **Annual Revenue**: $600,000
- **Operating Costs**: $300,000
- **Net Profit**: $300,000 (50% margin)

#### 16.4.2 Year 2 Projections
- **Total Users**: 250,000
- **Conversion Rate**: 7% to paid tiers
- **Monthly Revenue**: ~$175,000
- **Annual Revenue**: $2.1 million
- **Operating Costs**: $800,000
- **Net Profit**: $1.3 million (62% margin)

---

## 17. Appendix

### 17.1 Glossary

| Term | Definition |
|------|------------|
| **CFI** | Canonical Fragment Identifier — a standard way to reference a position within an EPUB file |
| **RAG** | Retrieval-Augmented Generation — an AI pattern that retrieves relevant context before generating a response |
| **pgvector** | A PostgreSQL extension for storing and querying high-dimensional vector embeddings |
| **SSE** | Server-Sent Events — a web API for streaming real-time data from server to browser over HTTP |
| **WCAG** | Web Content Accessibility Guidelines — international standards for web accessibility |
| **HNSW** | Hierarchical Navigable Small World — an approximate nearest-neighbor index algorithm |
| **RLS** | Row-Level Security — PostgreSQL feature for data isolation |
| **JWT** | JSON Web Token — a compact, URL-safe token for authentication |
| **SSO** | Single Sign-On — authentication allowing access to multiple systems |
| **CI/CD** | Continuous Integration/Continuous Deployment — automated software delivery |

### 17.2 References

- [PDF.js Documentation](https://mozilla.github.io/pdf.js/)
- [epub.js Documentation](https://github.com/futurepress/epub.js)
- [Axum Framework Documentation](https://docs.rs/axum/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [pgvector GitHub Repository](https://github.com/pgvector/pgvector)
- [OpenAI API Documentation](https://platform.openai.com/docs/)
- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [Docker Documentation](https://docs.docker.com/)

### 17.3 Document History & Version Control

#### 17.3.1 Version Control System
- **Repository**: GitHub private repository
- **Branch Strategy**: GitFlow with main/develop/feature branches
- **Pull Requests**: Required for all changes, with code review
- **Commit Convention**: Conventional Commits specification

#### 17.3.2 Document History

| Version | Date | Author | Changes | Status |
|---------|------|--------|---------|--------|
| 1.0 | 2026-05-01 | Product Team | Initial draft | Draft |
| 1.1 | 2026-05-10 | Engineering | Added database schema | Draft |
| 2.0 | 2026-05-25 | Cross-functional | Complete PRD with all sections | **Final** |

#### 17.3.3 Change Approval Process
1. **Proposal**: Team member submits change request via GitHub Issue
2. **Review**: Cross-functional review (Product, Engineering, Design, Marketing)
3. **Approval**: Requires 2+ approvals from different departments
4. **Implementation**: Update document with version bump
5. **Notification**: All stakeholders notified of changes
6. **Archive**: Previous versions maintained in document history

### 17.4 Stakeholder Contact Information

| Department | Primary Contact | Role | Email |
|------------|-----------------|------|-------|
| Product | Alex Chen | Product Manager | alex.chen@bookshelf.com |
| Engineering | Maria Rodriguez | Engineering Lead | maria.rodriguez@bookshelf.com |
| Design | James Wilson | UX/UI Designer | james.wilson@bookshelf.com |
| Marketing | Sarah Johnson | Marketing Director | sarah.johnson@bookshelf.com |
| Business | David Kim | Business Development | david.kim@bookshelf.com |

### 17.5 Legal & Compliance

#### 17.5.1 Data Protection
- **GDPR Compliance**: Data processing agreements, user consent mechanisms
- **CCPA Compliance**: California consumer privacy rights
- **Data Retention**: User data retained for active accounts + 30 days after deletion
- **Data Export**: Users can export all personal data via account settings

#### 17.5.2 Terms of Service
- **Acceptable Use**: Prohibits copyright infringement, malicious content
- **Intellectual Property**: Users retain rights to uploaded content
- **Liability Limitations**: Standard software-as-a-service terms
- **Dispute Resolution**: Arbitration clause for commercial disputes

#### 17.5.3 Privacy Policy
- **Data Collection**: Transparent disclosure of collected data
- **Third-party Sharing**: Limited to essential service providers
- **Cookies**: Clear explanation of tracking technologies
- **User Rights**: Instructions for data access/deletion requests

---

## 18. Acceptance Criteria Matrix

### 18.1 Feature Acceptance Criteria Summary

| Feature ID | Must Have | Should Have | Could Have | Won't Have (v1.0) |
|------------|-----------|-------------|------------|-------------------|
| F-01: Upload | ✓ File validation<br>✓ Progress bar<br>✓ Duplicate detection | ✓ Batch upload<br>✓ Drag & drop | ✓ Cloud import<br>✓ URL import | ✗ OCR processing |
| F-02: Reader | ✓ PDF/EPUB render<br>✓ Zoom controls<br>✓ Night mode | ✓ Text selection<br>✓ Bookmarking | ✓ Text-to-speech<br>✓ Split view | ✗ DRM support |
| F-03: Annotation | ✓ Highlight colors<br>✓ Margin notes<br>✓ Persistence | ✓ Annotation search<br>✓ Export formats | ✓ Shared annotations<br>✓ Templates | ✗ Voice annotations |
| F-04: AI Chat | ✓ Book context<br>✓ Streaming responses<br>✓ History | ✓ Suggested questions<br>✓ Multiple models | ✓ Custom prompts<br>✓ Image analysis | ✗ Voice interaction |
| F-05: Continue | ✓ Auto-save position<br>✓ Cross-device sync<br>✓ Library indicator | ✓ Reading timeline<br>✓ Session tracking | ✓ Reading streaks<br>✓ Achievement badges | ✗ Offline sync |
| F-06: Progress | ✓ Percentage display<br>✓ Statistics page<br>✓ Goal setting | ✓ Reading speed<br>✓ Time tracking | ✓ Comparative analytics<br>✓ Export reports | ✗ Social sharing |
| F-07: Categorization | ✓ Status badges<br>✓ Manual override<br>✓ Filter/sort | ✓ Custom categories<br>✓ Smart sorting | ✓ Priority ranking<br>✓ Due dates | ✗ AI categorization |
| F-08: Profile | ✓ Edit profile<br>✓ Change password<br>✓ Theme preferences | ✓ Reading goals<br>✓ Session management | ✓ Export data<br>✓ Account deletion | ✗ Social profiles |
| F-09: Search | ✓ Global search<br>✓ Full-text content<br>✓ Filters | ✓ Search history<br>✓ Suggestions | ✓ Advanced operators<br>✓ Semantic search | ✗ Image search |
| F-10: Organization | ✓ Folders/tags<br>✓ Drag & drop<br>✓ Bulk operations | ✓ Nested folders<br>✓ Smart collections | ✓ Auto-tagging<br>✓ Import organization | ✗ Collaborative org |
| F-11: Import/Export | ✓ Annotation export<br>✓ Data backup<br>✓ CSV import | ✓ Batch export<br>✓ Format conversion | ✓ API access<br>✓ Migration tools | ✗ Real-time sync |
| F-12: Statistics | ✓ Dashboard<br>✓ Trends charts<br>✓ Goal tracking | ✓ Productivity insights<br>✓ Reading habits | ✓ Comparative analysis<br>✓ Custom reports | ✗ Social benchmarks |
| F-13: Auth | ✓ Email/password<br>✓ OAuth providers<br>✓ Account linking | ✓ Multi-factor auth<br>✓ SSO integration | ✓ Biometric auth<br>✓ Passwordless | ✗ Enterprise SSO |
| F-14: Notifications | ✓ Reading reminders<br>✓ System alerts<br>✓ Preferences | ✓ Email notifications<br>✓ Push notifications | ✓ Custom schedules<br>✓ Smart reminders | ✗ SMS notifications |
| F-15: Accessibility | ✓ WCAG 2.1 AA<br>✓ Keyboard nav<br>✓ Screen reader | ✓ High contrast<br>✓ Reduced motion | ✓ Voice control<br>✓ Custom shortcuts | ✗ Braille support |

### 18.2 Quality Gates Checklist

#### 18.2.1 Pre-Launch Checklist
- [ ] All critical bugs resolved (P0, P1 severity)
- [ ] Performance benchmarks meet targets
- [ ] Security audit completed and issues addressed
- [ ] Accessibility audit completed (WCAG 2.1 AA)
- [ ] Cross-browser testing completed (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness verified
- [ ] Load testing completed (10,000 concurrent users)
- [ ] Disaster recovery tested
- [ ] Monitoring and alerting configured
- [ ] Documentation complete (user guides, API docs)

#### 18.2.2 Post-Launch Monitoring
- [ ] Error rate < 0.1% (p95)
- [ ] API latency < 200ms (p95)
- [ ] Uptime > 99.5%
- [ ] User satisfaction > 80%
- [ ] Conversion rate tracking
- [ ] Usage analytics operational
- [ ] Cost monitoring in place
- [ ] Backup verification automated

---

*End of Document — BookShelf PRD v2.0 (Complete)*

**Distribution List:**
- Product Team: All members
- Engineering: All developers, QA, DevOps
- Design: UX/UI designers
- Marketing: Campaign managers
- Executive: CTO, CEO, Product VP
- Business Development: Partnership managers

**Next Steps:**
1. Final review by all department heads (72 hours)
2. Approval sign-off required
3. Development kickoff meeting scheduled
4. Project tracking setup in Jira/Asana
5. Regular status updates established
