// router.js

import { loadHTML } from "./utils/html-loader.js"; // ⬅️ Import utility

let appRoutes = {};
let appContainer = null;

/**
 * Handles the actual page load based on the current URL path.
 * @param {string} path - The path to load (e.g., '/about').
 */
async function navigateTo(path) {
  let effectivePath = path;

  // If /home is accessed, and a route for / (home) exists, use that
  if (path === "/home" && appRoutes["/"]) {
    effectivePath = "/";
  }

  const routePath = appRoutes[effectivePath];

  if (routePath) {
    // 1. Load the new HTML content into the main container
    await loadHTML(routePath, appContainer);

    // 2. Optional: Scroll to the top of the new page
    window.scrollTo(0, 0);

    // 3. Optional: Update page title (can be improved)
    document.title =
      effectivePath.slice(1).charAt(0).toUpperCase() + effectivePath.slice(2) ||
      "Home";
  } else {
    // Handle 404 Not Found
    console.warn(`Route not found for path: ${path}`);
    appContainer.innerHTML =
      "<h1>404 | Page Not Found</h1><p>The page you requested does not exist.</p>";
  }
}

/**
 * Handles navigation clicks on the document.
 * @param {Event} e - The click event.
 */
function handleLinkClick(e) {
  const target = e.target.closest("a"); // Find the closest link element

  // Check if the link has the data-route attribute for SPA navigation
  if (target && target.hasAttribute("data-route")) {
    e.preventDefault();
    const path = target.getAttribute("href");

    // Update the URL and trigger navigation
    history.pushState({}, "", path);
    navigateTo(path);
  }
}

/**
 * Initializes the router: sets up routes, container, and listeners.
 * @param {object} routes - Map of URL paths to HTML file paths.
 * @param {HTMLElement} container - The main container for page content.
 */
export function initializeRouter(routes, container) {
  appRoutes = routes;
  appContainer = container;

  // 1. Initial load based on the current URL
  navigateTo(window.location.pathname);

  // 2. Event listener for back/forward browser buttons
  window.addEventListener("popstate", () => {
    navigateTo(window.location.pathname);
  });

  // 3. Event listener for all link clicks on the document
  document.addEventListener("click", handleLinkClick);
}

// NOTE: Your HTML links MUST use the 'data-route' attribute and 'href' to work:
// <a href="/about" data-route>About Us</a>
