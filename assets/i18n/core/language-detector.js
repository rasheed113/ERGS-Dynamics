class LanguageDetector {


    detectBrowserLanguage() {

        const language =
            navigator.language
            || navigator.userLanguage;


        if (!language) {
            return null;
        }


        return language
            .split("-")[0];

    }



    detect() {

        return this.detectBrowserLanguage();

    }


}


export default new LanguageDetector();
