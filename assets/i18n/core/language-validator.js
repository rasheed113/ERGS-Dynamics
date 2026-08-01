import LANGUAGE_REGISTRY from "./language-registry.js";


class LanguageValidator {


    exists(language) {

        return Boolean(
            LANGUAGE_REGISTRY[language]
        );

    }


    validate(language) {

        if (this.exists(language)) {

            return language;

        }


        return null;

    }


}


export default new LanguageValidator();
