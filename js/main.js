
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




    initialiseNavigation();
    initialiseAnimations();
    initialiseEffects();
    loadLiveClock();

    console.log("ERGS Dynamics Website Initialised");

}


/*
Global effects moved to js/effects.js
*/



