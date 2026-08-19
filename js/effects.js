/*
=================================================
ERGS Dynamics
Global Effects Module
=================================================
*/

function initialiseEffects() {

    if (document.body.dataset.effectsInitialised === "true") {
        return;
    }

    document.body.dataset.effectsInitialised = "true";

    initialiseClickEffect();
    initialiseBackToTop();

}


/*
Click Reaction Effect
*/

function initialiseClickEffect() {

    document.addEventListener("click", function(event) {

        const ripple = document.createElement("span");

        ripple.className = "click-ripple";

        ripple.style.left = event.clientX + "px";
        ripple.style.top = event.clientY + "px";

        document.body.appendChild(ripple);

        setTimeout(function() {
            ripple.remove();
        }, 600);

    });

}


/*
Back To Top Shortcut
*/

function initialiseBackToTop() {

    if (document.querySelector(".back-to-top")) {
        return;
    }

    const button = document.createElement("button");

    button.className = "back-to-top";
    button.innerHTML = "↑";

    button.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(button);

    function updateBackToTopVisibility() {

        if (window.scrollY > 500) {
            button.classList.add("show");
        } else {
            button.classList.remove("show");
        }

    }

    window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });

    updateBackToTopVisibility();

    button.addEventListener("click", function() {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}
