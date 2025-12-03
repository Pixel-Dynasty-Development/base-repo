// router.js

// This function needs to be defined OR imported if it's in a utility file.
// For now, define it here since you defined it in your main.js
async function loadContent(url, container) {
  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    const text = await response.text();
    container.innerHTML = text;
  } catch (error) {
    console.error("Error loading content:", error);
    container.innerHTML =
      '<p class="text-center text-red-500 p-8">Sorry, this content could not be loaded. Please check the file path.</p>';
  }
}

/**
 * Sets up the routing logic using URL hash changes.
 * @param {object} routes - Map of route names to file paths.
 * @param {HTMLElement} pageContainer - The main container element for page content.
 */
export function initializeRouter(routes, pageContainer) {
  // Handles routing and page loading based on the URL hash
  async function handleRouteChange() {
    const hash = window.location.hash.substring(1) || "home";
    const pageFile = routes[hash];

    if (pageFile) {
      await loadContent(pageFile, pageContainer);
      window.scrollTo(0, 0); // Always scroll to top on page change
    } else {
      // 404 handler
      pageContainer.innerHTML =
        '<p class="text-center p-8 text-2xl font-bold">404 - Page Not Found</p>';
    }
  }

  // Listen for hash changes to navigate between pages
  window.addEventListener("hashchange", handleRouteChange);

  // Handle the initial route when the page first loads
  handleRouteChange();

  // Ensure a default page is loaded if no hash is present
  if (!window.location.hash) {
    window.location.hash = "#home";
  }
}
