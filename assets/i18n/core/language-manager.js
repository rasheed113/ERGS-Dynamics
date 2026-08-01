import LANGUAGE_CONFIG from "./language-config.js";
import languageLoader from "./language-loader.js";
import preferenceManager from "./preference-manager.js";


class LanguageManager {


    constructor() {

        this.currentLanguage =
            LANGUAGE_CONFIG.defaultLanguage;

        this.translations = {};

    }



    async initialize() {


        const savedLanguage =
            preferenceManager.getPreferredLanguage();


        if (savedLanguage) {

            this.currentLanguage =
                savedLanguage;

        }


        this.translations =
            await languageLoader.load(
                this.currentLanguage
            );


    }



    async setLanguage(language) {


        this.currentLanguage =
            language;


        this.translations =
            await languageLoader.load(
                language
            );


        preferenceManager
            .setPreferredLanguage(
                language
            );


        document.documentElement.lang =
            language;


        return this.translations;

    }




    getLanguage() {

        return this.currentLanguage;

    }




    getTranslation(path) {


        const keys =
            path.split(".");


        let result =
            this.translations;



        for (const key of keys) {


            if (
                result &&
                result[key] !== undefined
            ) {

                result =
                    result[key];

            } else {

                return path;

            }

        }


        return result;

    }


}


export default new LanguageManager();
