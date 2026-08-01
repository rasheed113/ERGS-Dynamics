from pathlib import Path
import json

base = Path("assets/i18n/locales")

master_file = base / "en" / "common.json"

with open(master_file, "r", encoding="utf-8") as f:
    master = json.load(f)


for folder in base.iterdir():

    if folder.is_dir():

        target = folder / "common.json"

        if not target.exists():

            with open(target, "w", encoding="utf-8") as f:
                json.dump(
                    master,
                    f,
                    ensure_ascii=False,
                    indent=4
                )

            print("Created:", folder.name)


print("Translation files generation complete")
