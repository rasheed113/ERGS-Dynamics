/*
=================================================
ERGS Dynamics
Global Navigation Loader
=================================================
*/

async function loadGlobalNavigation() {

    const container = document.getElementById("global-navigation");

    if (!container) {
        return;
    }

    try {

        const navigationPath = "/components/navigation.html";

        const response = await fetch(navigationPath);

        if (!response.ok) {
            throw new Error(
                "Unable to load navigation: " + navigationPath
            );
        }

        const html = await response.text();

        container.innerHTML = html;
    // -------------------------------------------------
    // Resolve navigation links for current page
    // -------------------------------------------------

    const inPagesFolder =
        window.location.pathname.includes("/pages/") ||
        window.location.pathname.endsWith("/pages");

        console.log("PATH:", window.location.pathname);
        console.log("IN PAGES:", inPagesFolder);

    if (inPagesFolder) {

        container.querySelectorAll("a[href]").forEach(link => {

            const href = link.getAttribute("href");

            if (!href) return;

            if (href === "/index.html") {
                link.setAttribute("href", "../index.html");
                return;
            }

            if (href.startsWith("pages/")) {
                link.setAttribute(
                    "href",
                    href.replace(/^pages\//, "")
                );
            }

        });

    }


        if (typeof initialiseNavigation === "function") {
            initialiseNavigation();
        }

        document.dispatchEvent(
            new CustomEvent("navigationLoaded")
        );

    } catch (error) {

        console.error(
            "Navigation loading failed:",
            error
        );

    }

}

document.addEventListener(
    "DOMContentLoaded",
    loadGlobalNavigation
);
