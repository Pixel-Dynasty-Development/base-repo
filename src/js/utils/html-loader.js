/**
 * Fetches and loads HTML content into a specified container.
 * @param {string} url - The URL of the HTML file to fetch.
 * @param {HTMLElement} container - The element to inject the HTML into.
 * @returns {Promise<boolean>} - True on success, false on failure.
 */
export async function loadHTML(url, container) {
	try {
		const response = await fetch(url);
		if (!response.ok)
			throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
		const text = await response.text();
		container.innerHTML = text;
		return true; // Indicate success
	} catch (error) {
		console.error("Error loading content:", error);
		container.innerHTML =
			'<p class="text-center text-red-500 p-8">Sorry, this content could not be loaded. Please check the file path.</p>';
		return false; // Indicate failure
	}
}
