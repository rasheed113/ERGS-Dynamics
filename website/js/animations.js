/*
ERGS Dynamics Website
Animation Module

Purpose:
Premium section reveal animations.
*/

function initialiseAnimations() {

    const revealElements = document.querySelectorAll(
        "section, article"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }

            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });
}
