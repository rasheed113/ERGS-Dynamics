/*
ERGS Dynamics
Live Digital Dashboard Clock
*/

function getDeviceTimeZone() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    } catch (error) {
        return "UTC";
    }
}

function requestDeviceCoordinates() {
    if (!navigator.geolocation) {
        return Promise.reject(new Error("Geolocation is not supported by this browser."));
    }

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }),
            reject,
            {
                enableHighAccuracy: false,
                maximumAge: 300000,
                timeout: 10000
            }
        );
    });
}

window.getDeviceCoordinates = window.getDeviceCoordinates || requestDeviceCoordinates();

async function resolveDeviceCity() {
    try {
        const coordinates = await window.getDeviceCoordinates;
        const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&localityLanguage=en`
        );

        if (!response.ok) {
            throw new Error(`Reverse geocoding failed: ${response.status}`);
        }

        const data = await response.json();
        return data.city || data.locality || data.principalSubdivision || data.countryName || "LOCAL TIME";
    } catch (error) {
        console.warn("Device location unavailable:", error);
        return null;
    }
}

function initialiseLiveClock() {
    const timeElement = document.getElementById("live-time");
    const dayElement = document.getElementById("live-day");
    const dateElement = document.getElementById("live-date");
    const timeZoneElement = document.getElementById("live-timezone");

    if (!timeElement || !dayElement || !dateElement || !timeZoneElement) {
        return;
    }

    const timeZone = getDeviceTimeZone();
    timeZoneElement.textContent = "LOCAL TIME";

    resolveDeviceCity().then(city => {
        if (city) {
            timeZoneElement.textContent = city.toUpperCase();
        }
    });

    function updateClock() {
        const now = new Date();

        const currentTime = new Intl.DateTimeFormat("en-US", {
            timeZone,
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        }).format(now);

        const currentDate = new Intl.DateTimeFormat("en-US", {
            timeZone,
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric"
        }).format(now);

        const day = new Intl.DateTimeFormat("en-US", {
            timeZone,
            weekday: "long"
        }).format(now);

        timeElement.textContent = currentTime;
        dayElement.textContent = day.toUpperCase();
        dateElement.textContent = currentDate.toUpperCase();
    }

    updateClock();
    setInterval(updateClock, 1000);
}

window.initialiseLiveClock = initialiseLiveClock;
