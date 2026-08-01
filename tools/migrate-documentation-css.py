from pathlib import Path
import shutil

pages = Path("pages")
backup = Path("archive/document_layout_phase/pages_before_documentation_css")
backup.mkdir(parents=True, exist_ok=True)

css_link = '    <link rel="stylesheet" href="../css/components/documentation.css">\n'

for page in pages.glob("*.html"):
    shutil.copy(page, backup / page.name)

    html = page.read_text(encoding="utf-8")

    if "documentation.css" not in html:
        html = html.replace(
            '<link rel="stylesheet" href="../css/components/back-to-top.css">',
            '<link rel="stylesheet" href="../css/components/back-to-top.css">\n' + css_link,
            1
        )

    page.write_text(html, encoding="utf-8")

print("Documentation CSS migration completed.")
