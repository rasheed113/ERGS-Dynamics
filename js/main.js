/*
ERGS Dynamics Website
Application Entry Point

Purpose:
Initialise the website and load application modules.
*/


document.addEventListener("DOMContentLoaded", initialiseApplication);


function initialiseApplication() {

    initialiseNavigation();
    initialiseAnimations();

    console.log("ERGS Dynamics Website Initialised");

}
