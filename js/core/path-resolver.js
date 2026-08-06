/*
=================================================
ERGS Dynamics
Path Resolver
=================================================
*/

function getBasePath() {

    if (window.location.hostname.includes("github.io")) {
        return "/ERGS-Dynamics/";
    }

    return "/";

}

function resolvePath(path) {

    return getBasePath() + path;

}
