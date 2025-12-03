// main.js

// 1. Uncomment and use the separated router file
import { initializeRouter } from "./router.js";
// If you want to use the loadContent utility, you need to import it too:
// import { loadHTML } from "./utils/html-loader.js"; // or similar

// Start the application when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

/**
 * Loads persistent components and initializes the router.
 */
async function initializeApp() {
  // The container where the pages will load
  const pageContainer = document.getElementById("page-container");

  // Check if the container exists! This is a likely missing piece.
  if (!pageContainer) {
    console.error(
      "Missing main page container. Ensure your index.html has an element with id='page-container'",
    );
    return;
  }

  const headerContainer = document.getElementById("header-container");
  const footerContainer = document.getElementById("footer-container");

  // Define the routes for your pages.
  const routes = {
    home: "src/pages/home.html",
    about: "src/pages/about.html",
    contact: "src/pages/contact.html",
  };

  // --- Core Functions ---

  // Keep the loadContent function if you don't have a separate utility file.
  async function loadContent(url, container) {
    // ... (Keep the loadContent function body from your original code)
  }

  // --- Initial Application Load ---

  // Load the persistent components (header and footer)
  await Promise.all([
    loadContent("./src/components/Header.html", headerContainer),
    loadContent("./src/components/Footer.html", footerContainer),
  ]);

  // Add event listeners for the newly loaded header (like mobile menu)
  initializeHeaderListeners();

  // 2. Pass the routes and the page container to the separated router
  initializeRouter(routes, pageContainer);
}

// --- Event Listeners (Keep these here or move to a separate file) ---

function initializeHeaderListeners() {
  // ... (Keep the initializeHeaderListeners function body from your original code)
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const headerContainer = document.getElementById("header-container");

  // Check for elements before adding listeners
  if (mobileMenuButton && mobileMenu && headerContainer) {
    // Toggle mobile menu
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Close mobile menu when a nav link is clicked (using event delegation)
    headerContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("nav-link")) {
        if (!mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
      }
    });
  }
}

// The original call:
// initializeApp();
// The document.addEventListener already calls initializeApp() once the DOM is ready,
// so you can safely remove the final initializeApp() call outside the listener.
