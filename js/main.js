/*
ERGS Dynamics Website
Application Entry Point

Purpose:
Initialise the website and load application modules.
*/

let applicationInitialised = false;

document.addEventListener("DOMContentLoaded", initialiseApplication);

async function initialiseApplication() {

    if (applicationInitialised) {
        return;
    }

    applicationInitialised = true;

    // Navigation is initialised by navigation-loader.js after the
    // navigation component has actually been inserted into the DOM.
    initialiseAnimations();
    initialiseEffects();

    if (typeof loadLiveClock === "function") {
        loadLiveClock();
    }

}

/*
Global effects moved to js/effects.js
*/
