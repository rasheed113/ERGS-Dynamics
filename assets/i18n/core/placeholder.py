import re

class PlaceholderProtector:
    """
    ERGS Translation Engine placeholder protection.
    Keeps variables and templates safe during translation.
    """

    PATTERNS = [
        r"\{[^}]+\}",
        r"\{\{[^}]+\}\}",
        r"%\w",
        r"<[^>]+>"
    ]

    def extract(self, text):
        found = []

        for pattern in self.PATTERNS:
            found.extend(re.findall(pattern, text))

        return found

    def restore(self, translated, placeholders):
        for item in placeholders:
            if item not in translated:
                translated += f" {item}"

        return translated
