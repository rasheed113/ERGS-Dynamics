/*
ERGS Dynamics Website
Application Entry Point

Purpose:
Initialise the website and load application modules.
*/

let applicationInitialised = false;

/*
The navigation component is asynchronous. Initialise the page-level
behaviour only after navigation-loader.js has inserted the navigation
DOM and dispatched navigationLoaded. This keeps navigation, effects and
live clock startup in one deterministic lifecycle on the main page.
*/
document.addEventListener("navigationLoaded", initialiseApplication);

async function initialiseApplication() {

    if (applicationInitialised) {
        return;
    }

    applicationInitialised = true;

    initialiseAnimations();
    initialiseEffects();

    if (typeof loadLiveClock === "function") {
        await loadLiveClock();
    }

}

/*
Global effects moved to js/effects.js
*/
