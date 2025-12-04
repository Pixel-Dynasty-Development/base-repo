// utils/html-loader.js

/**
 * Fetches HTML content from a URL and injects it into a container.
 * This is the core function for loading components and pages.
 * @param {string} url - The URL of the HTML content to load.
 * @param {HTMLElement} container - The container element to load the content into.
 * @returns {Promise<void>}
 */
export async function loadHTML(url, container) {
  if (!container) return; // Exit if the container doesn't exist

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    container.innerHTML = html;
  } catch (error) {
    console.error(`Error loading content from ${url}:`, error);
    // Display an error message to the user
    container.innerHTML = `<p style="color: red;">Error: Failed to load ${url}</p>`;
  }
}
