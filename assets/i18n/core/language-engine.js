import languageManager from "./language-manager.js";
import languageSwitcher from "./language-switcher.js";
import languageDetector from "./language-detector.js";
import preferenceManager from "./preference-manager.js";
import LANGUAGE_CONFIG from "./language-config.js";


class LanguageEngine {


    async initialize() {


        let language =
            preferenceManager.getPreferredLanguage();



        if (!language) {

            language =
                languageDetector.detect();

        }



        if (!language) {

            language =
                LANGUAGE_CONFIG.defaultLanguage;

        }



        await languageManager.setLanguage(
            language
        );



        document.dispatchEvent(
            new CustomEvent(
                "languageReady",
                {
                    detail: {
                        language: language
                    }
                }
            )
        );


        return language;

    }





    async changeLanguage(language) {


        const result =
            await languageSwitcher.switch(
                language
            );


        return result;

    }





    translate(key) {


        return languageManager
            .getTranslation(key);

    }





    currentLanguage() {


        return languageManager
            .getLanguage();

    }


}


export default new LanguageEngine();
