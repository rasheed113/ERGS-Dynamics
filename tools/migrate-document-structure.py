from pathlib import Path
import shutil

pages = Path("pages")
backup = Path("archive/document_layout_phase/pages_before_document_structure")
backup.mkdir(parents=True, exist_ok=True)

for page in pages.glob("*.html"):
    shutil.copy(page, backup / page.name)

    html = page.read_text(encoding="utf-8")

    if '<main class="document-content">' not in html:
        html = html.replace(
            "<main>",
            '<main class="document-content">',
            1
        )

    page.write_text(html, encoding="utf-8")

print("Document structure migration completed.")
