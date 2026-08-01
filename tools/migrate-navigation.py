from pathlib import Path
import shutil

pages = Path("pages")
backup = Path("archive/navigation_migration_backup/batch_script_before")

backup.mkdir(parents=True, exist_ok=True)

final_scripts = """<script src="../js/navigation.js"></script>
<script src="../js/animations.js"></script>
<script src="../js/effects.js"></script>
<script src="../js/navigation-loader.js"></script>
<script src="../js/main.js"></script>"""

for page in pages.glob("*.html"):

    if page.name == "architecture.html":
        continue

    shutil.copy(page, backup / page.name)

    s = page.read_text()

    # Remove old mobile navigation blocks
    start = s.find('<button class="menu-toggle"')
    end = s.find('<ul class="desktop-menu">')
    if start != -1 and end != -1:
        s = s[:start] + s[end:]

    start = s.find('<div class="mobile-menu">')
    end = s.find('</nav>')
    if start != -1 and end != -1:
        s = s[:start] + s[end:]

    s = s.replace('<div class="menu-overlay"></div>', '')

    # Add global navigation
    if "global-navigation" not in s:
        s = s.replace(
            "</nav>",
            '<div id="global-navigation"></div>\n    </nav>',
            1
        )

    # Clean all old scripts
    import re
    s = re.sub(
        r'<script src="\.\./js/(navigation|animations|effects|main|navigation-loader)\.js"></script>',
        '',
        s
    )

    s = s.replace(
        "</body>",
        final_scripts + "\n</body>"
    )

    page.write_text(s)

print("Navigation migration completed.")
