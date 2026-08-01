from pathlib import Path
import shutil
import re

PAGES = Path("pages")
BACKUP = Path("archive/back_navigation_migration/pages_before_back_button_migration")

BACKUP.mkdir(parents=True, exist_ok=True)

SCRIPTS = """
<script src="../js/back-navigation.js"></script>
<script src="../js/back-navigation-loader.js"></script>
"""

PLACEHOLDER = """
<div id="back-navigation-container"></div>
"""

for page in PAGES.glob("*.html"):

    shutil.copy(page, BACKUP / page.name)

    html = page.read_text(encoding="utf-8")

    if "back-navigation-container" not in html:
        html = html.replace(
            "<main>",
            "<main>\n" + PLACEHOLDER,
            1
        )

    html = re.sub(
        r'<a[^>]*href="javascript:history\.back\(\)"[^>]*>.*?</a>',
        "",
        html,
        flags=re.DOTALL
    )

    if "back-navigation-loader.js" not in html:
        html = html.replace(
            "</body>",
            SCRIPTS + "\n</body>"
        )

    page.write_text(html, encoding="utf-8")

print("Back navigation migration script ready.")
