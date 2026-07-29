document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".doc-navigation-container");

    if (!container) return;

    const current = window.location.pathname.split("/").pop();
    const index = documents.findIndex(doc => doc[1] === current);

    if (index === -1) {
        container.innerHTML = '<div class="doc-navigation">Navigation Error</div>';
        return;
    }

    const previous = documents[index - 1];
    const next = documents[index + 1];

    container.innerHTML = `
        <div class="doc-navigation">
            ${previous ? `<a class="previous" href="${previous[1]}">Next → ${previous[0]}</a>` : ""}
            ${next ? `<a class="next" href="${next[1]}">← Previous ${next[0]}</a>` : ""}
        </div>
    `;
});
