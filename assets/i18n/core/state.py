import json
import os
from datetime import datetime


class TranslationState:

    def __init__(
        self,
        state_file="assets/i18n/state/translation-state.json"
    ):
        self.state_file = state_file

        self.data = {
            "completed": {},
            "failed": {},
            "updated": None
        }

        self.load()


    def load(self):

        if os.path.exists(self.state_file):

            with open(
                self.state_file,
                "r",
                encoding="utf-8"
            ) as f:
                old = json.load(f)

            # migrate old format safely
            if isinstance(old.get("completed"), list):
                self.data["completed"] = {}

            else:
                self.data = old


    def save(self):

        os.makedirs(
            os.path.dirname(self.state_file),
            exist_ok=True
        )

        self.data["updated"] = datetime.utcnow().isoformat()

        with open(
            self.state_file,
            "w",
            encoding="utf-8"
        ) as f:
            json.dump(
                self.data,
                f,
                ensure_ascii=False,
                indent=2
            )


    def mark_completed(self, language, item):

        self.data["completed"].setdefault(
            language,
            []
        )

        if item not in self.data["completed"][language]:
            self.data["completed"][language].append(item)

        self.save()


    def is_completed(self, language, item):

        return item in self.data["completed"].get(
            language,
            []
        )


    def mark_failed(self, language, item):

        self.data["failed"].setdefault(
            language,
            []
        )

        self.data["failed"][language].append(item)

        self.save()
