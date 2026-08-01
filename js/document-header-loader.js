/*
=================================================
ERGS Dynamics
Document Header Loader
=================================================
*/

async function loadDocumentHeader() {

    const container = document.getElementById("document-header-container");

    if (!container) {
        return;
    }

    try {

        const response = await fetch("/components/document-header.html");

        if (!response.ok) {
            throw new Error("Unable to load document header.");
        }

        container.innerHTML = await response.text();

        const main = document.querySelector("main.document-content, main.document-reader");

        if (!main) {
            return;
        }

        const title =
            main.dataset.title || "ERGS Dynamics";

        const category =
            main.dataset.category || "Engineering Documentation";

        const version =
            main.dataset.version || "Version 1.0";

        const status =
            main.dataset.status || "Stable";

        const reading =
            main.dataset.readingTime || "5 min read";

        const headerTitle =
            container.querySelector(".document-header-title");

        const headerBrand =
            container.querySelector(".document-header-brand");

        const headerCategory =
            container.querySelector(".document-category");

        const headerVersion =
            container.querySelector(".document-version");

        const headerStatus =
            container.querySelector(".document-status");

        const headerReading =
            container.querySelector(".document-reading-time");

        if (headerBrand) {
            headerBrand.textContent = "ERGS Dynamics Documentation";
        }

        if (headerTitle) {
            headerTitle.textContent = title;
        }

        if (headerCategory) {
            headerCategory.textContent = category;
        }

        if (headerVersion) {
            headerVersion.textContent = version;
        }

        if (headerStatus) {
            headerStatus.textContent = status;

            headerStatus.classList.add(
                "status-" + status.toLowerCase()
            );
        }

        if (headerReading) {
            headerReading.textContent = reading;
        }

    } catch (error) {

        console.error(
            "Document Header loading failed:",
            error
        );

    }

}

document.addEventListener(
    "DOMContentLoaded",
    loadDocumentHeader
);
