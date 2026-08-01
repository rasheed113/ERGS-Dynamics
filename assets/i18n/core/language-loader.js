import LANGUAGE_CONFIG from "./language-config.js";

class LanguageLoader {

    constructor() {
        this.cache = {};
    }


    async load(language) {

        if (this.cache[language]) {
            return this.cache[language];
        }


        try {

            const response = await fetch(
                `${LANGUAGE_CONFIG.supportedLanguagesPath}${language}/${LANGUAGE_CONFIG.translationFile}`
            );


            if (!response.ok) {
                throw new Error(
                    `Language file not found: ${language}`
                );
            }


            const data = await response.json();


            this.cache[language] = data;


            return data;


        } catch(error) {


            console.warn(
                `Loading fallback language: ${LANGUAGE_CONFIG.fallbackLanguage}`
            );


            const fallbackResponse = await fetch(
                `${LANGUAGE_CONFIG.supportedLanguagesPath}${LANGUAGE_CONFIG.fallbackLanguage}/${LANGUAGE_CONFIG.translationFile}`
            );


            const fallbackData =
                await fallbackResponse.json();


            this.cache[LANGUAGE_CONFIG.fallbackLanguage] =
                fallbackData;


            return fallbackData;
        }
    }


    clearCache() {

        this.cache = {};

    }


    has(language) {

        return Boolean(
            this.cache[language]
        );

    }

}


export default new LanguageLoader();
