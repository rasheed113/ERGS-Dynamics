/*
=================================================
ERGS Dynamics
Global Footer Loader
=================================================
*/

async function loadGlobalFooter() {

    const container = document.getElementById("global-footer");

    if (!container) {
        return;
    }

    try {

        const footerPath =
            resolveComponentPath("footer.html");

        const response = await fetch(footerPath);

        if (!response.ok) {
            throw new Error(
                "Unable to load footer: " + footerPath
            );
        }

        container.innerHTML = await response.text();

        container.querySelectorAll("[data-footer-page]").forEach((link) => {
            link.href = resolvePagePath(link.dataset.footerPage);
        });

        container.querySelectorAll("[data-footer-href]").forEach((link) => {
            link.href = resolvePath(link.dataset.footerHref);
        });

        document.dispatchEvent(
            new CustomEvent("footerLoaded")
        );

    } catch (error) {

        console.error(
            "Footer loading failed:",
            error
        );

    }

}

document.addEventListener(
    "DOMContentLoaded",
    loadGlobalFooter
);
