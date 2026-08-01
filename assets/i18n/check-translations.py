from pathlib import Path
import json


base = Path("assets/i18n/locales")


def flatten(data, prefix=""):
    result = []

    for key, value in data.items():
        path = f"{prefix}.{key}" if prefix else key

        if isinstance(value, dict):
            result.extend(flatten(value, path))
        else:
            result.append(path)

    return result


with open(base / "en" / "common.json",
          encoding="utf-8") as f:
    master = json.load(f)


master_keys = set(flatten(master))


for folder in sorted(base.iterdir()):

    file = folder / "common.json"

    if file.exists():

        with open(file, encoding="utf-8") as f:
            data = json.load(f)

        keys = set(flatten(data))

        missing = master_keys - keys

        percent = (
            (len(keys & master_keys)
            /
            len(master_keys))
            * 100
        )

        print(
            f"{folder.name}: {percent:.0f}% | Missing: {len(missing)}"
        )
