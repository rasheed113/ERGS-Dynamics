/*
ERGS Dynamics
Live Clock Component Loader
*/

async function loadLiveClock() {

    const container = document.getElementById("live-clock-container");

    if (!container) {
        return;
    }

    try {

        const response = await fetch("./components/live-clock/live-clock.html");

        const html = await response.text();

        container.innerHTML = html;

        if (window.initialiseLiveClock) {
            window.initialiseLiveClock();

        if (window.loadWeather) {
            window.loadWeather();
        }
        }

    } catch (error) {

        console.error(
            "Live Clock loading failed:",
            error
        );

    }

}
