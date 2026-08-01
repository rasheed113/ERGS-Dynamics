import languageManager from "./language-manager.js";

class LanguageSwitcher {

    async switch(language) {

        try {

            await languageManager.setLanguage(language);

            document.dispatchEvent(
                new CustomEvent(
                    "languageChanged",
                    {
                        detail: {
                            language: language
                        }
                    }
                )
            );

            return true;

        } catch(error) {

            console.error(
                "Language switch failed:",
                error
            );

            return false;
        }
    }


    current() {
        return languageManager.getLanguage();
    }
}


export default new LanguageSwitcher();
