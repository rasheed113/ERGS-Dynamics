/*
=================================================
ERGS Dynamics
Document Viewer Engine v3
=================================================
*/

function getDocumentName() {
    const params = new URLSearchParams(window.location.search);
    return params.get("doc") || "README";
}

function getLanguage() {
    return localStorage.getItem("ergs-language") || "en";
}

function getDocumentPath() {
    return `../docs/${getLanguage()}/${getDocumentName()}.md`;
}

function calculateReadingTime(text) {
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
}

function updateReadingTime(text) {
    const element = document.querySelector(".document-reading-time");

    if (element) {
        element.textContent =
            `${calculateReadingTime(text)} min read`;
    }
}

function updateDocumentTitle(markdown) {

    const match = markdown.match(/^# (.*)$/m);

    const title = match
        ? match[1]
        : getDocumentName();

    const element =
        document.querySelector(".document-header-title");

    if (element) {
        element.textContent = title;
    }

    document.title =
        `${title} | ERGS Dynamics`;
}


function renderMarkdown(markdown) {

    let html = markdown;

    html = html.replace(
        /```([\s\S]*?)```/g,
        "<pre><code>$1</code></pre>"
    );

    html = html.replace(
        /^### (.*)$/gm,
        "<h3>$1</h3>"
    );

    html = html.replace(
        /^## (.*)$/gm,
        "<h2>$1</h2>"
    );

    html = html.replace(
        /^# (.*)$/gm,
        "<h1>$1</h1>"
    );

    html = html.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );

    html = html.replace(
        /^- (.*)$/gm,
        "<li>$1</li>"
    );

    html = html.replace(
        /(<li>.*<\/li>)/gs,
        "<ul>$1</ul>"
    );

    html = html.replace(
        /\n\n/g,
        "</p><p>"
    );

    html =
        "<p>" + html + "</p>";

    html = html.replace(
        /<p>(<h[1-3]>)/g,
        "$1"
    );

    html = html.replace(
        /(<\/h[1-3]>)<\/p>/g,
        "$1"
    );

    html = html.replace(
        /<p>(<pre>)/g,
        "$1"
    );

    html = html.replace(
        /(<\/pre>)<\/p>/g,
        "$1"
    );

    return html;
}


async function loadMarkdown() {

    const container =
        document.getElementById(
            "markdown-content"
        );

    if (!container) {
        console.error(
            "markdown-content not found"
        );
        return;
    }

    const file =
        getDocumentPath();

    try {

        const response =
            await fetch(file);

        if (!response.ok) {
            throw new Error(
                "Document not found: " + file
            );
        }

        const markdown =
            await response.text();

        container.innerHTML =
            renderMarkdown(markdown);

        updateDocumentTitle(markdown);

        updateReadingTime(markdown);


    } catch(error) {

        console.error(error);

        container.innerHTML =
        `
        <div class="document-error">
            <h2>Documentation unavailable</h2>
            <p>${error.message}</p>
        </div>
        `;
    }
}


document.addEventListener(
    "DOMContentLoaded",
    loadMarkdown
);