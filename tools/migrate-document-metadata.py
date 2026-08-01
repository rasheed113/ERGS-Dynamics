from pathlib import Path
import shutil

PAGES = Path("pages")
BACKUP = Path("archive/document_header_phase/pages_before_document_metadata")
BACKUP.mkdir(parents=True, exist_ok=True)

DEFAULTS = {
    "about.html": ("About ERGS Dynamics", "Company", "Version 1.0", "3 min read"),
    "architecture.html": ("Architecture", "Engineering Foundation", "Version 1.0", "8 min read"),
    "changelog.html": ("Changelog", "Documentation", "Version 1.0", "5 min read"),
    "contact.html": ("Contact", "Company", "Version 1.0", "2 min read"),
    "design-system.html": ("Design System", "Engineering Foundation", "Version 1.0", "8 min read"),
    "development-workflow.html": ("Development Workflow", "Engineering Foundation", "Version 1.0", "7 min read"),
    "foundation.html": ("Engineering Foundation", "Engineering Foundation", "Version 1.0", "7 min read"),
    "future-products.html": ("Future Products", "Products", "Version 1.0", "4 min read"),
    "privacy-policy.html": ("Privacy Policy", "Legal", "Version 1.0", "6 min read"),
    "products.html": ("Engineering Products", "Products", "Version 1.0", "5 min read"),
    "project-rules.html": ("Project Rules", "Engineering Foundation", "Version 1.0", "6 min read"),
    "readme.html": ("README", "Developer Guide", "Version 1.0", "5 min read"),
    "services.html": ("Engineering Services", "Services", "Version 1.0", "5 min read"),
    "terms.html": ("Terms & Conditions", "Legal", "Version 1.0", "6 min read"),
    "trading-bot.html": ("Trading Bot", "Products", "Version 1.0", "4 min read"),
    "work-disk.html": ("Work_Disk", "Products", "Version 1.0", "5 min read"),
}

for page in PAGES.glob("*.html"):
    shutil.copy(page, BACKUP / page.name)

    html = page.read_text(encoding="utf-8")

    if 'data-title=' in html:
        continue

    title, category, version, reading = DEFAULTS.get(
        page.name,
        ("ERGS Dynamics", "Documentation", "Version 1.0", "5 min read")
    )

    replacement = f'''<main class="document-content"
data-title="{title}"
data-category="{category}"
data-version="{version}"
data-reading-time="{reading}">'''

    html = html.replace(
        '<main class="document-content">',
        replacement,
        1
    )

    page.write_text(html, encoding="utf-8")

print("Document metadata migration completed.")
