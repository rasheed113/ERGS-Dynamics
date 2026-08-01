from abc import ABC, abstractmethod
from typing import List


class BaseTranslationAdapter(ABC):
    """
    ERGS Translation Engine adapter contract.
    Every translation backend must implement this interface.
    """

    @abstractmethod
    def translate_batch(
        self,
        texts: List[str],
        target_language: str
    ) -> List[str]:
        """
        Translate a list of texts into target language.
        """
        pass
