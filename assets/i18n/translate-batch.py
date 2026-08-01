#!/usr/bin/env python3

import os
import sys
import argparse

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE_DIR)

from core.engine import TranslationEngine
from adapters.gemini import GeminiAdapter
from core.language_manager import LanguageManager
from core.quality_runner import QualityRunner


def run_language(code):

    manager = LanguageManager()

    language = manager.get_language(code)

    if not language:
        print(f"Language not found: {code}")
        return

    if not language.get("enabled"):
        print(f"Language disabled: {code}")
        return


    print("\n========================")
    print(
        f"Translating: {language['name']} ({code})"
    )
    print("========================\n")


    batch_file = os.path.join(
        BASE_DIR,
        "translation-batches",
        "batch-02.txt"
    )


    adapter = GeminiAdapter()

    engine = TranslationEngine(
        adapter
    )


    engine.process(
        batch_file,
        language["name"],
        code
    )


def main():

    parser = argparse.ArgumentParser(
        description="ERGS Translation Engine"
    )

    parser.add_argument(
        "--lang",
        help="Translate single language"
    )

    parser.add_argument(
        "--all",
        action="store_true",
        help="Translate all enabled languages"
    )

    parser.add_argument(
        "--pending",
        action="store_true",
        help="Translate pending languages only"
    )


    args = parser.parse_args()


    manager = LanguageManager()


    if args.all:

        for lang in manager.get_enabled():
            run_language(
                lang["code"]
            )

    elif args.lang:

        run_language(
            args.lang
        )

    elif args.pending:

        for code in manager.get_pending():
            run_language(code)

    else:

        print(
            "Use --lang CODE, --all or --pending"
        )


    QualityRunner().run()



if __name__ == "__main__":
    main()
