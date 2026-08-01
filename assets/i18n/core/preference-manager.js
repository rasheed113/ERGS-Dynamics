import languageStorage from "./language-storage.js";

class PreferenceManager {

    setPreferredLanguage(language) {

        languageStorage.save(language);

    }


    getPreferredLanguage() {

        return languageStorage.get();

    }


    hasPreference() {

        return languageStorage.exists();

    }


    clearPreference() {

        languageStorage.remove();

    }

}


export default new PreferenceManager();
