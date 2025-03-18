
# Industrial Automation Dashboard

## Overview

This industrial automation dashboard provides real-time monitoring and control of production systems. The application simulates a factory environment with machines, performance metrics, alerts, and control capabilities.

## Features

- **Machine Status Monitoring**: Real-time status updates of multiple machines including temperature, pressure, and production metrics
- **Performance Analytics**: Visual representations of production efficiency, output rates, and resource utilization
- **Alert System**: Dynamic notification system that displays warnings, critical alerts, and information messages
- **Control Panel**: Remote control capabilities for managing machines and production lines
- **Responsive Design**: Full functionality across desktop and mobile devices

## Technology Stack

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom industrial theme
- **UI Components**: shadcn/ui (Radix UI based components)
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Routing**: React Router
- **State Management**: React Query
- **Animations**: Custom CSS animations for smooth transitions

## Project Structure

```
src/
├── components/
│   ├── dashboard/         # Dashboard-specific components
│   │   ├── AlertsPanel.tsx
│   │   ├── ControlPanel.tsx
│   │   ├── MachineStatus.tsx
│   │   └── PerformanceMetrics.tsx
│   ├── layout/            # Layout components
│   │   └── DashboardLayout.tsx
│   └── ui/                # Reusable UI components
│       ├── StatusIndicator.tsx
│       └── ...
├── pages/                 # Page components
│   ├── Index.tsx          # Main dashboard page
│   └── NotFound.tsx       # 404 page
├── lib/                   # Utility functions
│   └── utils.ts
├── App.tsx                # Main application component
└── main.tsx               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd industrial-automation-dashboard
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Data Simulation

This project simulates real-time industrial data:

- Machine status changes dynamically to simulate real-world conditions
- Temperature and pressure values fluctuate within realistic ranges
- Alerts are generated based on simulated events
- Production metrics update to show performance trends

## Available Pages

- **Dashboard** (`/`): Main control interface with all monitoring systems
- Future planned routes include detailed machine views, historical analytics, and settings

## Customization

The application uses a custom industrial theme with:

- Industry-specific color palette
- Status indicators for different operational states
- Glass-panel design for key information displays
- Custom animations for alerts and status changes

## Building for Production

```
npm run build
```

This creates a `dist` directory with optimized production files ready for deployment.
