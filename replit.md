# Replit.md - Smart Phonebook Application

## Overview

This is a modern phonebook application built with pure vanilla JavaScript, HTML, and CSS. The application implements advanced features including a Trie-based search algorithm for lightning-fast contact lookups, voice search capabilities using Web Speech API, and a comprehensive contact management system. Data is stored in browser localStorage and features a clean, responsive UI with dark/light theme support.

## System Architecture

### Frontend Architecture
- **Language**: Pure vanilla JavaScript (ES6+)
- **Markup**: Semantic HTML5
- **Styling**: Custom CSS with CSS Variables for theming
- **Icons**: Font Awesome 6.0 for consistent iconography
- **Fonts**: Google Fonts (Roboto) for typography
- **Storage**: Browser localStorage for data persistence

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
- **Call Simulation**: Realistic call interface with duration tracking, mute, and speaker controls
- **Data Export/Import**: JSON-based contact backup and restore functionality
- **Theme System**: Light/dark mode toggle with localStorage persistence
- **Real-time Search**: Trie-based instant search with auto-suggestions
- **Contact Management**: Full CRUD operations with favorites system
- **Responsive Design**: Mobile-first approach with touch-friendly interactions

### Data Structure
JavaScript objects with the following schemas:
- **Contact Object**: id, name, phone, email, tag, favorite, createdAt, lastCalled
- **Call Log Object**: id, contactId, duration, timestamp, type
- **Storage**: All data persisted in browser localStorage with JSON serialization

## Data Flow

1. **Contact Storage**: Contacts stored in browser localStorage
2. **Trie Indexing**: Client-side Trie data structure built from contacts for O(m) search complexity
3. **Real-time Search**: User input triggers Trie search with instant results and suggestions
4. **State Management**: Application state managed in JavaScript class with localStorage persistence
5. **Voice Input**: Web Speech API converts voice to text for hands-free search

## External Dependencies

### Core Dependencies
- **Font Awesome**: Icons and visual elements (CDN)
- **Google Fonts**: Roboto font family for typography (CDN)
- **Web Speech API**: Browser native voice recognition
- **localStorage API**: Browser native data persistence

### No Build Tools Required
- **Pure JavaScript**: No transpilation or bundling needed
- **Vanilla CSS**: Custom CSS with modern features (Grid, Flexbox, Variables)
- **HTML5**: Semantic markup with modern form controls
- **Progressive Enhancement**: Works in all modern browsers

## Deployment Strategy

### Development Environment
- **Static Files**: Direct file serving from file system
- **No Build Process**: Files can be opened directly in browser
- **Hot Reload**: Native browser refresh for development
- **Port Configuration**: Express serves static files on port 5000

### Production Deployment
- **Static Hosting**: Can be deployed to any static hosting service
- **File Structure**: index.html, style.css, script.js in root directory
- **CDN Dependencies**: Font Awesome and Google Fonts served from CDN
- **Browser Compatibility**: Modern browsers with Web Speech API support

### File Management
- **No Database**: All data stored in browser localStorage
- **Import/Export**: JSON file-based backup and restore
- **Version Control**: Simple three-file structure easy to maintain

## Changelog

```
Changelog:
- June 24, 2025: Initial React/TypeScript implementation
- June 24, 2025: Complete rewrite to vanilla JavaScript/HTML/CSS
  - Implemented Trie data structure for fast search
  - Added Web Speech API for voice search
  - Created responsive design with dark/light themes
  - Added realistic call simulation with controls
  - Implemented localStorage data persistence
  - Added 48 diverse Indian contacts with proper formatting
  - Created comprehensive CRUD operations
  - Added import/export functionality
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
Technology preference: Vanilla JavaScript, HTML, CSS only - no frameworks or backend.
Contact data: Indian phone numbers with +91 country code.
Features required: Voice search, dark/light themes, Trie-based search, call simulation.
```