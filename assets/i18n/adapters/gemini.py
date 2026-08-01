import os
import json
import requests
import time
from typing import List

from adapters.base import BaseTranslationAdapter


class GeminiAdapter(BaseTranslationAdapter):
    """
    ERGS Gemini REST Translation Adapter.
    """

    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")

        if not self.api_key:
            raise RuntimeError(
                "GEMINI_API_KEY environment variable missing"
            )

        self.url = (
            "https://generativelanguage.googleapis.com/"
            "v1beta/models/gemini-flash-latest:generateContent"
        )


    def translate_batch(
        self,
        texts: List[str],
        target_language: str
    ) -> List[str]:

        prompt = f"""
Translate the following UI text strings into {target_language}.

Rules:
- Return ONLY a JSON array.
- Keep the exact same order.
- Do not add explanations.
- Do not translate placeholders like {{name}}.
- Preserve punctuation and symbols.
- Translate the actual meaning for website/app UI.

Input:
{json.dumps(texts, ensure_ascii=False)}
"""


        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ]
        }


        max_retries = 3
        response = None

        for attempt in range(max_retries):
            try:
                response = requests.post(
                    self.url,
                    params={
                        "key": self.api_key
                    },
                    json=payload,
                    timeout=60
                )

                if response.status_code in [429, 500, 502, 503, 504]:
                    raise requests.RequestException(
                        f"Temporary API error: {response.status_code}"
                    )

                response.raise_for_status()
                break

            except requests.RequestException as e:
                if attempt == max_retries - 1:
                    raise RuntimeError(
                        f"Gemini failed after retries: {e}"
                    )

                wait = 2 ** attempt
                print(
                    f"Retry {attempt + 1}/{max_retries} after {wait}s..."
                )

                time.sleep(wait)

        response.raise_for_status()

        data = response.json()

        text = (
            data["candidates"][0]
            ["content"]
            ["parts"][0]
            ["text"]
        )


        text = (
            text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )


        return json.loads(text)
