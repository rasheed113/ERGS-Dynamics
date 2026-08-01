import LANGUAGE_CONFIG from "./language-config.js";


class LanguageFallback {


    getFallback() {

        return LANGUAGE_CONFIG.fallbackLanguage;

    }


    resolve(language, validator) {

        if (validator.validate(language)) {

            return language;

        }


        return this.getFallback();

    }


}


export default new LanguageFallback();
