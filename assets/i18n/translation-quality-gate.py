from pathlib import Path
from core.language_manager import LanguageManager
import json


BASE = Path("assets/i18n/locales")

REQUIRED_KEYS = [
    "nav",
    "buttons",
    "hero",
    "messages",
    "system"
]


def check_language(folder):

    report = {
        "language": folder.name,
        "status": "READY",
        "issues": []
    }


    file = folder / "common.json"


    if not file.exists():

        report["status"] = "FAILED"
        report["issues"].append("Missing common.json")
        return report


    try:

        with open(file, encoding="utf-8") as f:
            data = json.load(f)

    except Exception:

        report["status"] = "FAILED"
        report["issues"].append("Invalid JSON")
        return report



    for key in REQUIRED_KEYS:

        if key not in data:

            report["status"] = "FAILED"
            report["issues"].append(
                f"Missing section: {key}"
            )


    return report



print("\nERGS Translation Quality Gate")
print("============================\n")


ready = 0
failed = 0


manager = LanguageManager()

for code in manager.list_codes():
    folder = BASE / code

    if folder.is_dir():

        result = check_language(folder)


        if result["status"] == "READY":
            ready += 1
        else:
            failed += 1


        print(
            f'{result["language"]}: {result["status"]}'
        )


print("\nSummary")
print("-------")
print("READY:", ready)
print("FAILED:", failed)
