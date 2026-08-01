class ProgressTracker:
    """
    ERGS Translation Engine progress tracker.
    """

    def __init__(self, total=0):
        self.total = total
        self.current = 0

    def update(self, amount=1):
        self.current += amount
        self.display()

    def display(self):
        if self.total == 0:
            percent = 0
        else:
            percent = (self.current / self.total) * 100

        print(
            f"Progress: {self.current}/{self.total} "
            f"({percent:.2f}%)"
        )

    def reset(self, total):
        self.total = total
        self.current = 0
