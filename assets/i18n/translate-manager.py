#!/usr/bin/env python3

from pathlib import Path
import json

from adapters.gemini import GeminiAdapter
from core.engine import TranslationEngine
from core.language_manager import LanguageManager

BASE = Path("assets/i18n")
BATCH = BASE / "translation-batches" / "batch-02.txt"


def translate_language(code):

    manager = LanguageManager()
    language = manager.get_language(code)

    if not language:
        print("Language not found:", code)
        return

    print("\n========================")
    print(
        f"Translating: {language['name']} ({code})"
    )
    print("========================")

    adapter = GeminiAdapter()

    engine = TranslationEngine(
        adapter
    )

    engine.process(
        str(BATCH),
        language["name"],
        code
    )


def load_pending():

    with open(
        BASE / "languages.json",
        encoding="utf-8"
    ) as f:
        data = json.load(f)

    return [
        x["code"]
        for x in data["languages"]
        if x.get("status") != "TRANSLATED"
    ]


def main():

    pending = load_pending()

    print("Pending:")
    print(pending)

    for code in pending:
        translate_language(code)


if __name__ == "__main__":
    main()
