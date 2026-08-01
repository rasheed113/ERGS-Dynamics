from pathlib import Path
import shutil

PAGES = Path("pages")
BACKUP = Path("archive/document_status_phase/pages_before_status_metadata_check")
BACKUP.mkdir(parents=True, exist_ok=True)

STATUS = {
    "about.html": "Stable",
    "architecture.html": "Stable",
    "changelog.html": "Maintained",
    "contact.html": "Stable",
    "design-system.html": "Stable",
    "development-workflow.html": "Stable",
    "foundation.html": "Stable",
    "future-products.html": "Research",
    "privacy-policy.html": "Stable",
    "products.html": "Stable",
    "project-rules.html": "Stable",
    "readme.html": "Maintained",
    "services.html": "Stable",
    "terms.html": "Stable",
    "trading-bot.html": "Experimental",
    "work-disk.html": "Development",
}

for page in PAGES.glob("*.html"):

    shutil.copy(page, BACKUP / page.name)

    html = page.read_text(encoding="utf-8")

    if "data-status=" in html:
        continue

    status = STATUS.get(page.name, "Stable")

    html = html.replace(
        'data-version="Version 1.0"',
        f'data-version="Version 1.0"\ndata-status="{status}"',
        1
    )

    page.write_text(html, encoding="utf-8")

print("Document status metadata migration completed.")
