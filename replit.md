# Replit.md - Smart Phonebook Application

## Overview

This is a modern, full-stack phonebook application built with React (frontend) and Express.js (backend). The application implements advanced features including a Trie-based search algorithm for lightning-fast contact lookups, voice search capabilities, and a comprehensive contact management system. It uses PostgreSQL for persistent data storage via Drizzle ORM and features a clean, responsive UI built with shadcn/ui components and Tailwind CSS.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management, React hooks for local state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **UI Components**: Comprehensive set of accessible components from Radix UI primitives

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Module System**: ES Modules for modern JavaScript support
- **Development**: TSX for TypeScript execution in development
- **Production**: ESBuild for fast, optimized bundling

## Key Components

### Data Structure & Search System
- **Trie Implementation**: Custom ContactTrie class for O(m) prefix-based searching where m is the length of the search query
- **Search Features**: 
  - Real-time auto-suggestions as user types
  - Prefix matching for names, phone numbers, and email addresses
  - Fast retrieval of contacts based on partial input

### Contact Management System
- **CRUD Operations**: Full create, read, update, delete functionality
- **Contact Properties**: Name, phone, email, tag categorization, favorite status, creation date, last called timestamp
- **Tag System**: Categorization by work, family, friends, or other
- **Favorites**: Mark frequently contacted people for quick access

### Advanced Features
- **Voice Search**: Web Speech API integration for hands-free contact searching
- **Call Simulation**: Modal-based calling interface with duration tracking and call state management
- **Data Export/Import**: JSON-based contact backup and restore functionality
- **Theme System**: Light/dark mode toggle with system preference detection

### Database Schema
Located in `shared/schema.ts`, defines:
- **Contact Schema**: Core contact information with validation via Zod
- **Call Log Schema**: Track call history with duration, timestamp, and call type
- **Type Safety**: TypeScript types generated from Zod schemas for end-to-end type safety

## Data Flow

1. **Contact Storage**: Contacts stored in PostgreSQL via Drizzle ORM
2. **Trie Indexing**: Client-side Trie built from contacts for fast searching
3. **Real-time Search**: User input triggers Trie search with instant results
4. **State Synchronization**: Local storage backup with server synchronization
5. **Voice Input**: Speech API converts voice to text for search queries

## External Dependencies

### Core Dependencies
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM for type-safe database operations
- **UI Framework**: React with comprehensive Radix UI component set
- **Form Handling**: React Hook Form with Zod validation
- **Date Handling**: date-fns for date formatting and manipulation

### Development Tools
- **Build System**: Vite with React plugin and runtime error overlay
- **TypeScript**: Full type safety across client and server
- **Tailwind CSS**: Utility-first CSS framework with PostCSS
- **ESLint Integration**: Code quality and consistency enforcement

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with ESM support
- **Database**: PostgreSQL 16 for local development
- **Hot Reload**: Vite dev server with HMR for rapid development
- **Port Configuration**: Server runs on port 5000 with external port 80

### Production Build
- **Client Build**: Vite builds optimized static assets to `dist/public`
- **Server Build**: ESBuild bundles server code to `dist/index.js`
- **Deployment Target**: Replit Autoscale for automatic scaling
- **Static Assets**: Served by Express in production mode

### Database Management
- **Migrations**: Drizzle-kit handles schema migrations
- **Environment**: DATABASE_URL environment variable for connection
- **Schema**: Centralized in `shared/schema.ts` for consistency

## Changelog

```
Changelog:
- June 24, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```