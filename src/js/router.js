import { loadHTML } from "./utils/html-loader.js";

/**
 * Dynamically builds the routes object by importing all .html files
 * from the /src/pages/ directory.
 */
function buildRoutes() {
	const routes = {};

	// Use Vite's import.meta.glob to find all .html files in /src/pages
	const pageModules = import.meta.glob("/src/pages/*.html", {
		as: "url",
		eager: true,
	});

	// Process the results into the { routeName: "path/to/file.html" } format
	for (const path in pageModules) {
		const fileName = path.split("/").pop();
		const routeName = fileName.replace(".html", "");
		routes[routeName] = pageModules[path];
	}
	return routes;
}

// --- Router Setup ---

const fileRoutes = buildRoutes(); // Dynamically found pages
const pageContainer = document.getElementById("page-container");

/**
 * Handles routing and page loading based on the URL hash.
 */
async function handleRouteChange() {
	const hash = window.location.hash.substring(1) || "home";
	window.scrollTo(0, 0);

	// --- 1. SPECIAL ROUTE CHECKS ---
	if (hash === "login") {
		handleLoginRoute();
		return;
	}

	const userProfileMatch = hash.match(/^user\/(.+)/);
	if (userProfileMatch) {
		const username = userProfileMatch[1];
		handleUserProfileRoute(username);
		return;
	}

	// --- 2. FILE-BASED ROUTE FALLBACK ---
	const pageFile = fileRoutes[hash];
	if (pageFile) {
		await loadHTML(pageFile, pageContainer);
	} else {
		// --- 3. 404 NOT FOUND ---
		pageContainer.innerHTML =
			'<p class="text-center p-8 text-2xl font-bold">404 - Page Not Found</p>';
	}
}

// --- SPECIAL ROUTE HANDLERS ---

/**
 * Handles the special #login route.
 */
async function handleLoginRoute() {
	// Load this from a different folder to keep it separate
	await loadHTML("src/portals/login.html", pageContainer);
}

/**
 * Handles the special #user/:username route.
 * @param {string} username - The username captured from the URL.
 */
async function handleUserProfileRoute(username) {
	// 1. Load the generic 'profile' page template
	const loaded = await loadHTML("src/pages/profile.html", pageContainer);

	// 2. Once loaded, populate it with dynamic data
	if (loaded) {
		const usernameEl = document.getElementById("profile-username");
		if (usernameEl) {
			usernameEl.textContent = username;
		}
		// Now you could fetch this user's data from a real API
		// fetch(`/api/users/${username}`)...
	}
}

/**
 * Initializes the router.
 */
export function initializeRouter() {
	window.addEventListener("hashchange", handleRouteChange);
	handleRouteChange(); // Handle the initial load
	if (!window.location.hash) {
		window.location.hash = "#home";
	}
}
