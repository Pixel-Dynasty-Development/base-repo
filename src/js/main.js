document.addEventListener("DOMContentLoaded", () => {
	const pageContainer = document.getElementById("page-container");
	const headerContainer = document.getElementById("header-container");
	const footerContainer = document.getElementById("footer-container");

	// Define the routes for your pages. Add new pages here!
	const routes = {
		home: "src/pages/home.html",
		about: "src/pages/about.html",
		contact: "src/pages/contact.html",
	};

	// --- Core Functions ---

	// Fetches and loads HTML content into a specified container
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

	// Handles routing and page loading based on the URL hash
	async function handleRouteChange() {
		const hash = window.location.hash.substring(1) || "home";
		const pageFile = routes[hash];

		if (pageFile) {
			await loadContent(pageFile, pageContainer);
			window.scrollTo(0, 0); // Always scroll to top on page change
		} else {
			// Optional: Create a 404.html page and add it to the routes object
			pageContainer.innerHTML =
				'<p class="text-center p-8 text-2xl font-bold">404 - Page Not Found</p>';
		}
	}

	// --- Initial Application Load ---

	async function initializeApp() {
		// Load the persistent components (header and footer)
		await Promise.all([
			loadContent("./src/components/Header.html", headerContainer),
			loadContent("./src/components/Footer.html", footerContainer),
		]);

		// Add event listeners for the newly loaded header (like mobile menu)
		initializeHeaderListeners();

		// Handle the initial route when the page first loads
		handleRouteChange();

		// Listen for hash changes to navigate between pages
		window.addEventListener("hashchange", handleRouteChange);

		// Ensure a default page is loaded if no hash is present
		if (!window.location.hash) {
			window.location.hash = "#home";
		}
	}

	// --- Event Listeners ---

	function initializeHeaderListeners() {
		const mobileMenuButton = document.getElementById("mobile-menu-button");
		const mobileMenu = document.getElementById("mobile-menu");

		if (mobileMenuButton && mobileMenu) {
			// Toggle mobile menu
			mobileMenuButton.addEventListener("click", () => {
				mobileMenu.classList.toggle("hidden");
			});

			// Close mobile menu when a nav link is clicked
			headerContainer.addEventListener("click", (e) => {
				if (e.target.classList.contains("nav-link")) {
					if (!mobileMenu.classList.contains("hidden")) {
						mobileMenu.classList.add("hidden");
					}
				}
			});
		}
	}

	// Start the application
	initializeApp();
});
