import LANGUAGE_REGISTRY_DATA from "./language-registry-data.js";


export function getLanguage(code) {

    return LANGUAGE_REGISTRY_DATA[code]
        || null;

}


export function getAllLanguages() {

    return LANGUAGE_REGISTRY_DATA;

}


export function hasLanguage(code) {

    return Boolean(
        LANGUAGE_REGISTRY_DATA[code]
    );

}


export default LANGUAGE_REGISTRY_DATA;
