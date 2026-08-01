from pathlib import Path
import json

from core.language_manager import LanguageManager


BASE = Path("assets/i18n/locales")


def flatten(data, prefix=""):
    result = {}

    for key, value in data.items():
        path = f"{prefix}.{key}" if prefix else key

        if isinstance(value, dict):
            result.update(flatten(value, path))
        else:
            result[path] = value

    return result


def analyze_language(code, master):

    file = BASE / code / "common.json"

    report = {
        "language": code,
        "coverage": 0,
        "status": "FAILED"
    }

    if not file.exists():
        return report

    try:
        with open(file, encoding="utf-8") as f:
            data = json.load(f)

    except Exception:
        return report


    current = flatten(data)

    total = len(master)

    translated = 0
    english_copy = 0


    for key, value in current.items():

        if key not in master:
            continue

        if value == master[key]:
            english_copy += 1
        else:
            translated += 1


    if total:
        coverage = int((translated / total) * 100)
    else:
        coverage = 0


    report["coverage"] = coverage


    if coverage == 100:
        report["status"] = "TRANSLATED"

    elif translated > 0:
        report["status"] = "PARTIAL"

    elif english_copy == total:
        report["status"] = "ENGLISH_COPY"


    return report





def update_language_registry(results):

    file = Path("assets/i18n/languages.json")

    with open(file, encoding="utf-8") as f:
        data = json.load(f)


    for lang in data["languages"]:

        code = lang["code"]

        if code in results:

            lang["status"] = results[code]["status"]
            lang["coverage"] = results[code]["coverage"]


    with open(file, "w", encoding="utf-8") as f:
        json.dump(
            data,
            f,
            indent=4,
            ensure_ascii=False
        )


def main():

    with open(
        BASE / "en" / "common.json",
        encoding="utf-8"
    ) as f:
        master = flatten(json.load(f))


    manager = LanguageManager()


    print("\nERGS Translation Report")
    print("======================\n")


    results = {}

    for code in manager.list_codes():

        result = analyze_language(
            code,
            master
        )

        results[code] = result

        print(
            f"{result['language']}: "
            f"{result['coverage']}% - "
            f"{result['status']}"
        )

    update_language_registry(results)


if __name__ == "__main__":
    main()
