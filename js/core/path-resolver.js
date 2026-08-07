/*
=================================================
ERGS Dynamics
Core Path Resolver
Single Source of Truth
=================================================
*/

function getBasePath() {

    return window.location.hostname.includes("github.io")
        ? "/ERGS-Dynamics/"
        : "/";

}

function resolvePath(path) {

    return getBasePath() + path;

}

function resolvePagePath(page) {

    return resolvePath("pages/" + page);

}

function resolveComponentPath(component) {

    return resolvePath("components/" + component);

}

function resolveAssetPath(asset) {

    return resolvePath("assets/" + asset);

}

function resolveScriptPath(script) {

    return resolvePath("js/" + script);

}

function resolveStylePath(style) {

    return resolvePath("css/" + style);

}

