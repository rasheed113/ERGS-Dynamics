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

        const navigationPath =
            resolveComponentPath("navigation.html");

        const response = await fetch(navigationPath);

        if (!response.ok) {
            throw new Error(
                "Unable to load navigation: " + navigationPath
            );
        }

        const html = await response.text();

        container.innerHTML = html;

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
