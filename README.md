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

## 🧪 Testing the Application

### Manual Testing Checklist

**Phase 1 - Fleet List:**

1. Open http://localhost:3000
2. Verify all 8 fleets are displayed
3. Click "Fleet Name" header - verify alphabetical sorting
4. Click "Vessel Count" header - verify numerical sorting

**Phase 2 - Fleet Details:**

1. Click any fleet row
2. Verify navigation to fleet detail page
3. Verify vessel table is sortable
4. Verify map displays with vessel markers
5. Click a marker - verify popup shows vessel information
6. Click outside popup - verify it closes

**Phase 3 - Search:**

1. On fleet detail page, locate search inputs
2. Enter "Italy" in flag field → Click Search → Verify filtering
3. Enter "GRE" in name field → Click Search → Verify filtering
4. Use multiple filters → Verify AND logic (all conditions must match)
5. Verify both table AND map update with filtered results

### API Testing

Test endpoints directly with curl:

```bash
# Get all fleets
curl http://localhost:5000/api/fleets

# Get vessels for specific fleet
curl http://localhost:5000/api/fleets/5c7bf491aaa48c3a6d06f314/vessels

# Search vessels
curl "http://localhost:5000/api/vessels/search?flag=Italy"
curl "http://localhost:5000/api/vessels/search?flag=Italy&name=GRE"
```

---

## 📝 Design Decisions

### Why In-Memory Storage?

- Fast data access without database overhead
- Simple deployment and setup
- Sufficient for demo/prototype purposes
- Easy to replace with database later if needed

### Why React Leaflet over Mapbox?

- No API key required
- Open-source and free
- Simpler setup for development
- Uses OpenStreetMap data

### Component Architecture

- Separated concerns: data fetching, display, and interaction
- Reusable components (VesselTable, VesselMap)
- Easy to extend with new features

### API Design

- RESTful conventions for predictable endpoints
- Query parameters for flexible searching
- Proper HTTP status codes and error handling

---

## 🔄 Extending the Application

The architecture supports easy additions:

**Potential Enhancements:**

- Add vessel type filtering
- Implement real-time updates with WebSockets
- Export data to CSV/Excel
- Add user authentication
- Implement vessel route history
- Add fleet comparison features
- Integrate real-time AIS data feeds

**Adding New Features:**

1. **Backend**: Add new route in `server/server.js`
2. **Frontend**: Create new component and add to router
3. **API Service**: Add function in `client/src/services/api.js`

---
