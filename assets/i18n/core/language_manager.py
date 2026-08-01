import json
from pathlib import Path


class LanguageManager:
    """
    ERGS Language Registry Manager.
    Controls enabled translation languages.
    """

    def __init__(
        self,
        config="assets/i18n/languages.json"
    ):
        self.config = Path(config)
        self.languages = self.load()


    def load(self):
        if not self.config.exists():
            return []

        with open(
            self.config,
            encoding="utf-8"
        ) as f:
            data = json.load(f)

        return data.get("languages", [])


    def get_enabled(self):
        return [
            lang
            for lang in self.languages
            if lang.get("enabled")
        ]


    def get_language(self, code):
        for lang in self.languages:
            if lang["code"] == code:
                return lang

        return None


    def list_codes(self):
        return [
            lang["code"]
            for lang in self.get_enabled()
        ]

    def get_pending(self):
        """
        Return enabled languages that are not fully translated.
        """

        pending = []

        for lang in self.get_enabled():

            status = lang.get("status", "ENGLISH_COPY")
            coverage = lang.get("coverage", 0)

            if status != "TRANSLATED" or coverage < 100:
                pending.append(lang["code"])

        return pending

