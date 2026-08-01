#!/usr/bin/env python3

import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE_DIR)

from core.engine import TranslationEngine
from adapters.gemini import GeminiAdapter
from core.quality_runner import QualityRunner


def main():

    batch_file = os.path.join(
        BASE_DIR,
        "translation-batches",
        "batch-02.txt"
    )

    target_language = "Urdu"

    adapter = GeminiAdapter()

    engine = TranslationEngine(
        adapter
    )

    engine.process(
        batch_file,
        target_language,
        "ur"
    )

    QualityRunner().run()


if __name__ == "__main__":
    main()
