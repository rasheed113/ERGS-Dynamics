import os


class BatchLoader:
    """
    ERGS Translation Engine batch file loader.
    """

    def load(self, batch_file):
        if not os.path.exists(batch_file):
            raise FileNotFoundError(
                f"Batch file not found: {batch_file}"
            )

        with open(batch_file, "r", encoding="utf-8") as f:
            items = [
                line.strip()
                for line in f
                if line.strip()
                and not line.startswith("#")
            ]

        return items

    def count(self, batch_file):
        return len(self.load(batch_file))
