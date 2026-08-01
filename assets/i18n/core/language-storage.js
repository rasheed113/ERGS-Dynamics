import LANGUAGE_CONFIG from "./language-config.js";

class LanguageStorage {

    save(language) {

        localStorage.setItem(
            LANGUAGE_CONFIG.storageKey,
            language
        );

    }


    get() {

        return localStorage.getItem(
            LANGUAGE_CONFIG.storageKey
        );

    }


    remove() {

        localStorage.removeItem(
            LANGUAGE_CONFIG.storageKey
        );

    }


    exists() {

        return !!this.get();

    }

}


export default new LanguageStorage();
