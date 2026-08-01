import subprocess
import sys


class QualityRunner:
    """
    ERGS Translation Engine quality pipeline runner.
    """

    def run(self):
        tools = [
            "check-translations.py",
            "translation-analyzer.py",
            "translation-quality-gate.py"
        ]

        print("\nRunning Translation Quality Pipeline\n")

        for tool in tools:
            print(f"\n--- Running {tool} ---")

            result = subprocess.run(
                [
                    sys.executable,
                    f"assets/i18n/{tool}"
                ],
                capture_output=True,
                text=True
            )

            print(result.stdout)

            if result.stderr:
                print("ERROR:")
                print(result.stderr)

        print("\nQuality pipeline completed.")
