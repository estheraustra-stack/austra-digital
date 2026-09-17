/* =========================================================
   AUSTRA DIGITAL
   Esther Austra — Front-End Developer & Responsive Web Designer
   Professional JavaScript
========================================================= */

"use strict";


/* =========================================================
   01. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       02. SELECT COMMON ELEMENTS
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navigationLinks = document.querySelectorAll(".nav-links a");

    const backToTop = document.querySelector(".back-to-top");

    const footer = document.querySelector("footer");
    const footerText = footer
        ? footer.querySelector("p")
        : null;

    const images = document.querySelectorAll("img");

    const contactForm = document.querySelector("form");


    /* =====================================================
       03. MOBILE NAVIGATION
    ===================================================== */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        /* Close menu after clicking a navigation link */

        navigationLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       04. ACTIVE NAVIGATION LINK
    ===================================================== */

    function updateActiveNavigation() {

        const currentHash = window.location.hash;

        navigationLinks.forEach(function (link) {

            const linkTarget = link.getAttribute("href");

            if (
                currentHash &&
                linkTarget === currentHash
            ) {

                link.classList.add("active");

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            } else {

                link.classList.remove("active");

                link.removeAttribute(
                    "aria-current"
                );

            }

        });

    }


    updateActiveNavigation();

    window.addEventListener(
        "hashchange",
        updateActiveNavigation
    );


    /* =====================================================
       05. FOOTER YEAR
    ===================================================== */

    if (footerText) {

        const currentYear = new Date().getFullYear();

        footerText.textContent =
            "© " +
            currentYear +
            " Austra Digital. All rights reserved.";

    }


    /* =====================================================
       06. BACK TO TOP BUTTON
    ===================================================== */

    if (backToTop) {

        function updateBackToTop() {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        }


        updateBackToTop();


        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );


        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo(
                    0,
                    0
                );

            }
        );

    }


    /* =====================================================
       07. EXTERNAL PROJECT LINKS
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach(function (link) {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       08. PROJECT LINKS
    ===================================================== */

    const projectLinks =
        document.querySelectorAll(
            ".project-card a"
        );


    projectLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");

        if (
            href &&
            (
                href.indexOf("http://") === 0 ||
                href.indexOf("https://") === 0
            )
        ) {

            link.setAttribute(
                "target",
                "_blank"
            );

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }

    });


    /* =====================================================
       09. IMAGE ERROR PROTECTION
    ===================================================== */

    images.forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                image.setAttribute(
                    "data-image-error",
                    "true"
                );

                image.setAttribute(
                    "alt",
                    "Austra Digital project image"
                );

                console.warn(
                    "An image could not be loaded: " +
                    image.getAttribute("src")
                );

            }
        );

    });


    /* =====================================================
       10. CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const nameField =
                    contactForm.querySelector(
                        '[name="name"]'
                    );

                const emailField =
                    contactForm.querySelector(
                        '[name="email"]'
                    );

                const messageField =
                    contactForm.querySelector(
                        '[name="message"]'
                    );


                const name =
                    nameField
                        ? nameField.value.trim()
                        : "";

                const email =
                    emailField
                        ? emailField.value.trim()
                        : "";

                const message =
                    messageField
                        ? messageField.value.trim()
                        : "";


                if (!name || !email || !message) {

                    alert(
                        "Please complete all required fields before sending your message."
                    );

                    return;

                }


                const emailAddress =
                    "estheraustra@gmail.com";


                const subject =
                    "Website enquiry from " +
                    name;


                const body =
                    "Hello Esther,%0D%0A%0D%0A" +
                    "Name: " +
                    encodeURIComponent(name) +
                    "%0D%0A" +
                    "Email: " +
                    encodeURIComponent(email) +
                    "%0D%0A%0D%0A" +
                    "Message:%0D%0A" +
                    encodeURIComponent(message);


                window.location.href =
                    "mailto:" +
                    emailAddress +
                    "?subject=" +
                    encodeURIComponent(subject) +
                    "&body=" +
                    body;

            }
        );

    }


    /* =====================================================
       11. KEYBOARD ACCESSIBILITY
    ===================================================== */

    if (menuToggle) {

        menuToggle.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    menuToggle.click();

                }

            }
        );

    }


    /* =====================================================
       12. CLOSE MOBILE MENU WITH ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                navLinks &&
                menuToggle
            ) {

                navLinks.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =====================================================
       13. PREVENT BROKEN EMPTY LINKS
    ===================================================== */

    const allLinks =
        document.querySelectorAll("a");


    allLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");


        if (
            href === "#" ||
            href === ""
        ) {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                }
            );

        }

    });


    /* =====================================================
       14. WEBSITE READY
    ===================================================== */

    console.log(
        "Austra Digital loaded successfully."
    );

});