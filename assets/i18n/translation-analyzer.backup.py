from pathlib import Path
from core.language_manager import LanguageManager
import json


base = Path("assets/i18n/locales")


def flatten(data, prefix=""):

    result = {}

    for key, value in data.items():

        path = f"{prefix}.{key}" if prefix else key

        if isinstance(value, dict):

            result.update(
                flatten(value, path)
            )

        else:

            result[path] = value

    return result



with open(base / "en" / "common.json",
          encoding="utf-8") as f:

    english = flatten(json.load(f))


total = len(english)


print("\nERGS Translation Report")
print("======================\n")


manager = LanguageManager()

for code in manager.list_codes():
    folder = base / code

    file = folder / "common.json"

    if not file.exists():
        continue


    with open(file, encoding="utf-8") as f:

        data = flatten(json.load(f))


    translated = 0


    for key, value in data.items():

        if key in english and value != english[key]:

            translated += 1



    percent = (translated / total) * 100


    status = (
        "Translated"
        if percent > 0
        else "English Copy"
    )


    print(
        f"{folder.name}: {percent:.0f}% - {status}"
    )

