/*
ERGS Dynamics
Live Digital Dashboard Clock
*/

function initialiseLiveClock() {

    const timeElement = document.getElementById("live-time");
    const dayElement = document.getElementById("live-day");
    const dateElement = document.getElementById("live-date");
    const timeZoneElement = document.getElementById("live-timezone");

    if (!timeElement || !dayElement || !dateElement || !timeZoneElement) {
        return;
    }

    function getDeviceTimeZone() {

        try {
            return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
        } catch (error) {
            return "UTC";
        }

    }

    const timeZone = getDeviceTimeZone();
    timeZoneElement.textContent = timeZone.replace("/", " / ").replace(/_/g, " ").toUpperCase();

    function updateClock() {

        const now = new Date();


        const currentTime = new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone,
                hour: "numeric",
                minute: "2-digit",
                                                    second: "2-digit",
                hour12: true
            }
        ).format(now);


        const currentDate = new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone,
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        ).format(now);


        const day = new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone,
                weekday: "long"
            }
        ).format(now);


        timeElement.textContent = currentTime;
        dayElement.textContent = day.toUpperCase();
        dateElement.textContent = currentDate.toUpperCase();

    }


    updateClock();

    setInterval(updateClock, 1000);

}


window.initialiseLiveClock = initialiseLiveClock;
