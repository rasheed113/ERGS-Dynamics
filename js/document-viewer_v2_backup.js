/*
=================================================
ERGS Dynamics
Document Viewer Engine
=================================================
*/

function getDocumentName(){

    const params = new URLSearchParams(
        window.location.search
    );

    return params.get("doc") || "README";

}


async function loadMarkdown(){

    const container =
        document.getElementById(
            "markdown-content"
        );

    if(!container){
        return;
    }


    const language =
        localStorage.getItem(
            "ergs-language"
        ) || "en";


    const documentName =
        getDocumentName();


    const file =
        `../docs/${language}/${documentName}.md`;


    try{

        const response =
            await fetch(file);


        if(!response.ok){
            throw new Error(
                "Document not found"
            );
        }


        const markdown =
            await response.text();


        container.innerHTML =
            renderMarkdown(markdown);


    }catch(error){

        container.innerHTML =
        "<p>Documentation unavailable.</p>";

        console.error(error);

    }

}


function renderMarkdown(text){

    let html = text;

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
        /^---$/gm,
        "<hr>"
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
        /<p>(<hr>)<\/p>/g,
        "$1"
    );

    return html;

}


document.addEventListener(
"DOMContentLoaded",
loadMarkdown
);
