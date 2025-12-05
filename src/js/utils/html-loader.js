// utils/html-loader.js
import config from "/config.json";

/**
 * Helper to replace {{ variables }} in text with values from config.json
 */
function injectConfigValues(html) {
  let processedHTML = html;

  // Replace simple text keys (e.g., {{businessName}})
  Object.keys(config).forEach((key) => {
    // This regex looks for {{ key }} globally
    const Regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    if (typeof config[key] === "string" || typeof config[key] === "number") {
      processedHTML = processedHTML.replace(Regex, config[key]);
    }
  });

  return processedHTML;
}

/**
 * Fetches HTML content from a URL, injects config variables, and places it into a container.
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

    const rawHtml = await response.text();

    // ✨ Inject config values before rendering
    const finalHtml = injectConfigValues(rawHtml);

    container.innerHTML = finalHtml;
  } catch (error) {
    console.error(`Error loading content from ${url}:`, error);
    // Display an error message to the user
    container.innerHTML = `<p style="color: red;">Error: Failed to load ${url}</p>`;
  }
}
