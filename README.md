# Windward Fleet Management System

A full-stack web application for managing and visualizing maritime vessel fleets with real-time tracking and search capabilities.

## 🚀 Running the Application

### Prerequisites

- Node.js (v14 or higher)
- npm

**Dependencies not installed:**

```bash
# Install all dependencies
npm install      # Root
cd server && npm install
cd client && npm install
```

### Quick Start (Single Command)

From the project root directory:

```bash
npm start
```

This will start both the backend server (port 5000) and frontend client (port 3000) concurrently.

The application will automatically open in your browser at `http://localhost:3000`

## 📋 Features

### Phase 1: Fleet Overview

- View all fleets in a sortable table
- Display fleet name and vessel count
- Sort by clicking column headers

### Phase 2: Fleet Details

- Click any fleet to view detailed information
- Sortable vessel table with Name, MMSI, Flag, and Location
- Interactive map displaying vessel locations
- Click vessel markers to view detailed information in popups

### Phase 3: Search & Filter

- Search vessels by name, MMSI, and/or flag
- Multiple filters use AND logic
- Real-time filtering of both table and map views

---

## 🏗️ Architecture

### Backend (Node.js + Express)

- RESTful API with three main endpoints:
  - `GET /api/fleets` - Retrieve all fleets with vessel counts
  - `GET /api/fleets/:id/vessels` - Get vessels for a specific fleet
  - `GET /api/vessels/search?name=X&mmsi=Y&flag=Z` - Search vessels with filters
- In-memory data storage (no database required)
- CORS enabled for local development

### Frontend (React)

- Single Page Application (SPA) with React Router
- Component-based architecture
- React Leaflet for interactive maps
- Material-UI for consistent styling
- Responsive design

## 🛠️ Technology Stack

### Backend

- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Node.js** - Runtime environment

### Frontend

- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Material-UI** - UI components
- **React Leaflet** - Map integration
- **Leaflet** - Interactive maps with OpenStreetMap

---

### Why React Leaflet over Mapbox?

- No API key required
- Open-source and free
- Simpler setup for development
- Uses OpenStreetMap data
