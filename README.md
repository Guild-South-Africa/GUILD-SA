# GUILD SA | Build & Ship Real-World Solutions

GUILD SA is a national build-and-ship ecosystem where students ship real digital products under real-world constraints. This repository contains the source code for the GUILD SA website, featuring a highly interactive, 3D WebGPU-powered background simulation.

## Overview

The GUILD SA website goes beyond a static landing page. It is designed to reflect the dynamic, active nature of the community it represents. Built with modern web technologies, it incorporates:

*   **Interactive 3D Boids Simulation**: A complex flocking simulation running in the background, built with Three.js and WebGPU.
*   **Scroll-Driven Storytelling**: The boids simulation dynamically changes its behavior (presets) based on the user's scroll position, complementing the content on the page.
*   **Immersive Design**: A floating interactive cursor, scroll-revealed elements, and a dynamic wave particle background.
*   **Custom Debug GUI**: Press `P` to open a custom GUI to tweak the boids simulation, lighting, and camera settings in real-time.

## Technology Stack

*   **Frontend Tooling**: [Vite](https://vitejs.dev/)
*   **3D Rendering**: [Three.js](https://threejs.org/) (utilizing the WebGPU renderer)
*   **Styling**: Vanilla CSS with modern layout techniques (CSS Variables, Grid, Flexbox)
*   **Physics/Math**: Custom boids algorithm implementation (`Boids.js`)

## Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm (or yarn/pnpm)

### Installation

1.  Clone the repository and navigate into the project directory.
2.  Install the dependencies:

    ```bash
    npm install
    ```

### Running Locally

Start the Vite development server:

```bash
npm run dev
```

Open your browser and navigate to the local URL provided in your terminal (usually `http://localhost:5173`).

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The compiled assets will be output to the `dist` directory.

## Project Structure

*   `index.html`: The main landing page.
*   `about.html`, `campus.html`, `events.html`, `join.html`, `partners.html`, `pipeline.html`: Additional pages.
*   `style.css`: Global styles, layout, and component CSS.
*   `app.js`: Core UI interactions, scroll reveal logic, cursor follower, and footer injection.
*   `scene.js`: Three.js scene setup, WebGPU renderer initialization, lighting, background wave particles, and the scroll-driven logic for the 3D scene.
*   `Boids.js`: The underlying flocking simulation logic.

## Interactivity & Features

*   **Boids Simulation Tweaking**: Open the site and press `P` on your keyboard. This enables debug mode, bringing up a GUI panel where you can adjust separation, alignment, cohesion, speed, and environmental settings.
*   **Scroll Presets**: As you scroll down the page, watch how the background color changes and the behavior of the "swarm" shifts to different target locations and formations.
