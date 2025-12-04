// main.js

import { initializeRouter } from "./router.js";
import { loadHTML } from "./utils/html-loader.js"; // ⬅️ NEW: Import utility

// Start the application when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

/**
 * Loads persistent components and initializes the router.
 */
async function initializeApp() {
  // 1. Get main containers
  const pageContainer = document.getElementById("page-container");
  const headerContainer = document.getElementById("header-container");
  const footerContainer = document.getElementById("footer-container");

  if (!pageContainer) {
    console.error(
      "Missing main page container. Ensure your index.html has an element with id='page-container'",
    );
    return;
  }

  // 2. Define the routes
  const routes = {
    "/": "src/pages/home.html", // Use "/" for the root path
    "/about": "src/pages/about.html",
    "/contact": "src/pages/contact.html",
    "/signin": "src/portals/login.html",
    // Add more routes as needed
  };

  // 3. Load the persistent components (header and footer)
  // We use the imported loadHTML utility
  await Promise.all([
    loadHTML("./src/components/Header.html", headerContainer),
    loadHTML("./src/components/Footer.html", footerContainer),
  ]);

  // 4. Add event listeners for the newly loaded header
  initializeHeaderListeners();

  // 5. Initialize the router
  // We pass the routes and the page container, but the router will import loadHTML itself.
  initializeRouter(routes, pageContainer);
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
