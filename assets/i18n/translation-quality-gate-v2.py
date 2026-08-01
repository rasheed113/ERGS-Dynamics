from pathlib import Path
import json


BASE = Path("assets/i18n/locales")

MASTER = BASE / "en" / "common.json"


def flatten(data, prefix=""):
    result = {}

    for key, value in data.items():

        path = f"{prefix}.{key}" if prefix else key

        if isinstance(value, dict):
            result.update(flatten(value, path))

        else:
            result[path] = value

    return result



with open(MASTER, encoding="utf-8") as f:
    english = flatten(json.load(f))


print("\nERGS Translation Quality Gate v2")
print("================================\n")


translated = 0
english_copy = 0


for folder in sorted(BASE.iterdir()):

    file = folder / "common.json"

    if not file.exists():
        continue


    with open(file, encoding="utf-8") as f:
        data = flatten(json.load(f))


    total = len(english)
    same = 0


    for key, value in english.items():

        if key in data and data[key] == value:
            same += 1


    score = int(((total - same) / total) * 100)


    if folder.name == "en":
        status = "SOURCE"
    elif score == 0:
        status = "ENGLISH COPY"
        english_copy += 1
    else:
        status = "TRANSLATED"
        translated += 1


    print(
        f"{folder.name}: {score}% - {status}"
    )


print("\nSummary")
print("----------------")
print("Translated:", translated)
print("English Copy:", english_copy)
