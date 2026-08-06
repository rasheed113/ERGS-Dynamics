/*
=================================================
ERGS Dynamics
Back Navigation Loader
=================================================
Purpose:
Load the reusable Back Navigation component
into every supported page.
*/

async function loadBackNavigation() {

    const container = document.getElementById("back-navigation-container");

    if (!container) {
        return;
    }

    try {

        const response = await fetch("../components/back-navigation.html");

        if (!response.ok) {
            throw new Error("Unable to load back navigation component.");
        }

        container.innerHTML = await response.text();

        if (typeof initialiseBackNavigation === "function") {
            initialiseBackNavigation();
        }

    } catch (error) {

        console.error(
            "Back Navigation loading failed:",
            error
        );

    }

}

document.addEventListener(
    "DOMContentLoaded",
    loadBackNavigation
);
