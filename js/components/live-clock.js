/*
ERGS Dynamics
Live Digital Dashboard Clock
*/

function initialiseLiveClock() {

    const timeElement = document.getElementById("live-time");
    const dayElement = document.getElementById("live-day");
    const dateElement = document.getElementById("live-date");

    if (!timeElement || !dayElement || !dateElement) {
        return;
    }


    function updateClock() {

        const now = new Date();


        const karachiTime = new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone: "Asia/Karachi",
                hour: "numeric",
                minute: "2-digit",
                                                    second: "2-digit",
                hour12: true
            }
        ).format(now);


        const karachiDate = new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone: "Asia/Karachi",
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        ).format(now);


        const day = new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone: "Asia/Karachi",
                weekday: "long"
            }
        ).format(now);


        timeElement.textContent = karachiTime;
        dayElement.textContent = day.toUpperCase();
        dateElement.textContent = karachiDate.toUpperCase();

    }


    updateClock();

    setInterval(updateClock, 1000);

}


window.initialiseLiveClock = initialiseLiveClock;
