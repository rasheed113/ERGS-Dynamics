/*
=================================================
ERGS Dynamics
Global Back Navigation
=================================================
Purpose:
Provide safe, professional back navigation without
allowing users to accidentally leave ERGS Dynamics.
*/

const BACK_FALLBACKS = {
    "architecture.html": "foundation.html",
    "foundation.html": "../index.html",

    "design-system.html": "readme.html",
    "readme.html": "project-rules.html",
    "project-rules.html": "development-workflow.html",
    "development-workflow.html": "architecture.html",
    "changelog.html": "design-system.html",

    "services.html": "../index.html",
    "products.html": "../index.html",

    "work-disk.html": "products.html",
    "trading-bot.html": "products.html",
    "future-products.html": "products.html",

    "about.html": "../index.html",
    "contact.html": "../index.html",

    "privacy-policy.html": "contact.html",
    "terms.html": "contact.html"
};

function getFallbackPage() {
    const page = location.pathname.split("/").pop();
    return BACK_FALLBACKS[page] || "../index.html";
}

function goBackSafely() {

    const referrer = document.referrer;

    if (referrer) {
        try {
            const previous = new URL(referrer);

            if (previous.origin === location.origin) {
                history.back();
                return;
            }
        } catch (error) {
            // Ignore malformed URLs and use fallback.
        }
    }

    location.href = getFallbackPage();
}

function initialiseBackNavigation() {

    const button = document.getElementById("back-button");

    if (!button) {
        return;
    }

    button.addEventListener("click", goBackSafely);
}
