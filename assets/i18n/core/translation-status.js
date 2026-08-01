class TranslationStatus {

    constructor() {

        this.status = {};

    }


    set(language, data) {

        this.status[language] = data;

    }


    get(language) {

        return this.status[language] || null;

    }


    all() {

        return this.status;

    }

}


export default new TranslationStatus();
