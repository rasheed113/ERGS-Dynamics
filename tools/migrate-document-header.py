from pathlib import Path
import shutil

PAGES = Path("pages")
BACKUP = Path("archive/document_header_phase/pages_before_document_header")
BACKUP.mkdir(parents=True, exist_ok=True)

HEADER = '<div id="document-header-container"></div>\n\n'
SCRIPTS = (
    '<script src="../js/document-header-loader.js"></script>\n'
)

for page in PAGES.glob("*.html"):
    shutil.copy(page, BACKUP / page.name)

    html = page.read_text(encoding="utf-8")

    if "document-header-container" not in html:
        html = html.replace(
            '<div id="back-navigation-container"></div>',
            '<div id="back-navigation-container"></div>\n\n' + HEADER,
            1
        )

    if "document-header-loader.js" not in html:
        html = html.replace(
            "</body>",
            SCRIPTS + "</body>"
        )

    page.write_text(html, encoding="utf-8")

print("Document header migration completed.")
