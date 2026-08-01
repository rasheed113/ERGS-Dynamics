import json
import os


class LocaleWriter:
    """
    ERGS locale JSON writer.
    Saves translated values into locale files.
    """

    def __init__(self, locale_dir="assets/i18n/locales"):
        self.locale_dir = locale_dir


    def load(self, language_code):

        path = os.path.join(
            self.locale_dir,
            os.path.join(language_code, "common.json")
        )

        if not os.path.exists(path):
            return {}

        with open(
            path,
            "r",
            encoding="utf-8"
        ) as f:
            return json.load(f)


    def save(self, language_code, data):

        os.makedirs(
            self.locale_dir,
            exist_ok=True
        )

        path = os.path.join(
            self.locale_dir,
            os.path.join(language_code, "common.json")
        )

        with open(
            path,
            "w",
            encoding="utf-8"
        ) as f:
            json.dump(
                data,
                f,
                ensure_ascii=False,
                indent=2
            )


    def set_nested(self, data, key, value):
        parts = key.split(".")
        current = data

        for part in parts[:-1]:
            current = current.setdefault(part, {})

        current[parts[-1]] = value

    def update(
        self,
        language_code,
        originals,
        translations
    ):

        data = self.load(language_code)

        for source, translated in zip(
            originals,
            translations
        ):
            self.set_nested(
                data,
                source,
                translated
            )

        self.save(
            language_code,
            data
        )

        return len(translations)
