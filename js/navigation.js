/*
ERGS Dynamics Website
Navigation Module

Purpose:
Manage mobile navigation behaviour.
*/


function initialiseNavigation() {

    const menuButton = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuLinks = document.querySelectorAll(".mobile-menu a");


    if (!menuButton || !mobileMenu || !menuOverlay) {
        return;
    }


    function openMenu() {

        document.querySelectorAll(".mobile-dropdown").forEach(item => {
            item.classList.remove("open");
        });

        menuButton.classList.add("active");
        mobileMenu.classList.add("active");
        menuOverlay.classList.add("active");

        menuButton.setAttribute("aria-expanded", "true");

        document.body.style.overflow = "hidden";
    }


    function closeMenu() {

        menuButton.classList.remove("active");
        mobileMenu.classList.remove("active");
        menuOverlay.classList.remove("active");

        menuButton.setAttribute("aria-expanded", "false");

        document.body.style.overflow = "";
    }


    menuButton.addEventListener("click", () => {

        const isOpen = mobileMenu.classList.contains("active");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    menuOverlay.addEventListener("click", closeMenu);


    menuLinks.forEach(link => {

        link.addEventListener("click", closeMenu);

    });


    /*
    Desktop Dropdown Navigation
    */

    const dropdowns = document.querySelectorAll(".has-dropdown");

    dropdowns.forEach(dropdown => {

        const button = dropdown.querySelector(".nav-dropdown-toggle");

        if (!button) {
            return;
        }

        button.addEventListener("click", event => {

            event.stopPropagation();

            dropdowns.forEach(item => {
                if (item !== dropdown) {
                    item.classList.remove("open");
                }
            });

            dropdown.classList.toggle("open");

        });

    });

    document.addEventListener("click", () => {

        dropdowns.forEach(dropdown => {
            dropdown.classList.remove("open");
        });

    });


    /*
    Mobile Dropdown Navigation
    */

    const mobileDropdowns = document.querySelectorAll(".mobile-dropdown");

    mobileDropdowns.forEach(dropdown => {

        const button = dropdown.querySelector(".mobile-dropdown-toggle");

        if (!button) {
            return;
        }

        button.addEventListener("click", event => {

            event.stopPropagation();

            mobileDropdowns.forEach(item => {
                if (item !== dropdown) {
                    item.classList.remove("open");
                }
            });

            dropdown.classList.toggle("open");

        });

    });


    /*
    Dynamic Navigation Paths
    */

    const navigationLinks =
        document.querySelectorAll("[data-path]");

    navigationLinks.forEach(link => {

        link.addEventListener("click", () => {

            const path = link.dataset.path;

            window.location.href = resolvePath(path);

        });

    });


}
