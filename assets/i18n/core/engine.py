from core.batch import BatchLoader
from core.state import TranslationState
from core.progress import ProgressTracker
from core.placeholder import PlaceholderProtector
from core.locale_writer import LocaleWriter


class TranslationEngine:
    """
    ERGS Translation Engine main processor.
    """

    def __init__(self, adapter):
        self.adapter = adapter
        self.batch_loader = BatchLoader()
        self.state = TranslationState()
        self.placeholder = PlaceholderProtector()
        self.writer = LocaleWriter()


    def process(
        self,
        batch_file,
        target_language,
        locale_code
    ):

        items = self.batch_loader.load(batch_file)

        progress = ProgressTracker(
            len(items)
        )

        pending = [
            item
            for item in items
            if not self.state.is_completed(locale_code, item)
        ]

        print(f"Total items: {len(items)}")
        print(f"Pending items: {len(pending)}")


        if not pending:
            print("Nothing to translate.")
            return


        translated = self.adapter.translate_batch(
            pending,
            target_language
        )


        self.writer.update(
            locale_code,
            pending,
            translated
        )


        for original, result in zip(
            pending,
            translated
        ):
            print(
                f"{original} -> {result}"
            )

            self.state.mark_completed(
                locale_code,
                original
            )

            progress.update()


        print(
            "Translation batch completed and locale updated."
        )
