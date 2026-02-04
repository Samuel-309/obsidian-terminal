# CryptoVault — Trading Dashboard

Premium cryptocurrency trading dashboard with real-time candlestick charts, order book visualization, and live trade feeds.

## Framework

Vite 6.x + React 19

## Preview

Runs on `0.0.0.0:8080` for k8s HTTPRoute access.

## Design

**Dark Terminal/Luxury Fintech Aesthetic**

- **Typography**: Space Grotesk (headers), Courier Prime (data)
- **Color Palette**: Deep charcoal (#0a0e27) base with neon cyan (#00d9ff) and lime (#39ff14) accents
- **Gains/Losses**: Vibrant lime for gains, hot coral (#ff3d5a) for losses
- **Depth**: Layered shadows, subtle grain texture, glassmorphism effects
- **Motion**: Micro-interactions on hovers, animated data updates, pulse effects

## Features

- **Left Sidebar**: Coin watchlist with sparkline charts, real-time price updates
- **Main Chart**: Interactive candlestick chart with grid, hover effects
- **Order Book**: Live bid/ask spread visualization with volume depth
- **Recent Trades**: Auto-updating table with buy/sell indicators
- **Top Navigation**: Portfolio value, 24h change, premium stat display

## Architecture

- **Responsive Grid Layout**: Asymmetric 3-column main view + sidebar
- **Component Structure**: Modular, reusable UI components
- **Real-time Updates**: Simulated WebSocket-style data intervals
- **Accessibility**: Semantic HTML, keyboard-friendly, high contrast