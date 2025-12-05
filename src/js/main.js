// main.js

import { initializeRouter } from "./router.js";
import { loadHTML } from "./utils/html-loader.js";
import config from "/config.json"; // ⬅️ Import config

// Start the application when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

/**
 * Loads persistent components, sets colors, and initializes the router.
 */
async function initializeApp() {
  // 1. Apply Brand Colors from Config
  applyThemeColors();

  // 2. Get main containers
  const pageContainer = document.getElementById("page-container");
  const headerContainer = document.getElementById("header-container");
  const footerContainer = document.getElementById("footer-container");

  if (!pageContainer) {
    console.error(
      "Missing main page container. Ensure your index.html has an element with id='page-container'",
    );
    return;
  }

  // 3. Define the routes
  const routes = {
    "/": "src/pages/home.html",
    "/about": "src/pages/about.html",
    "/contact": "src/pages/contact.html",
    "/signin": "src/portals/login.html",
    // Add more routes as needed
  };

  // 4. Load the persistent components (header and footer)
  await Promise.all([
    loadHTML("./src/components/Header.html", headerContainer),
    loadHTML("./src/components/Footer.html", footerContainer),
  ]);

  // 5. Add event listeners for the newly loaded header
  initializeHeaderListeners();

  // 6. Initialize the router
  initializeRouter(routes, pageContainer);
}

/**
 * Overrides CSS variables with values from config.json
 */
function applyThemeColors() {
  const root = document.documentElement;
  const colors = config.colors;

  if (colors) {
    if (colors.primary)
      root.style.setProperty("--color-primary", colors.primary);
    if (colors.secondary)
      root.style.setProperty("--color-secondary", colors.secondary);
    if (colors.accent) root.style.setProperty("--color-accent", colors.accent);
    if (colors.bgPage) root.style.setProperty("--color-bg-page", colors.bgPage);
    if (colors.textDefault)
      root.style.setProperty("--color-text-default", colors.textDefault);
  }
}

/**
 * Adds interactivity to the header elements (e.g., mobile menu).
 */
function initializeHeaderListeners() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const headerContainer = document.getElementById("header-container");

  if (mobileMenuButton && mobileMenu && headerContainer) {
    // Toggle mobile menu
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Close mobile menu when a nav link is clicked
    headerContainer.addEventListener("click", (e) => {
      // Check if the clicked element has the 'nav-link' class
      if (e.target.classList.contains("nav-link")) {
        // Find the closest link element and check for the 'data-route' attribute
        const link = e.target.closest("a");
        if (link && link.hasAttribute("data-route")) {
          // Close mobile menu if it's open
          if (!mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.add("hidden");
          }
        }
      }
    });
  }
}
