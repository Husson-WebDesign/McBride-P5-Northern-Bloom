/* =====================================================
   Northern Bloom Floral & Events
   Phase 3 - JavaScript and Interactive Features
===================================================== */
// Temporary test message: confirms this file is connected.
// (Removed before final submission.)
console.log("JavaScript loaded successfully.");

// =========================
// Page Setup
// =========================
// Tells the CSS that JavaScript is running. The menu button and the FAQ
// panels only change their layout when this class is present, so the site
// still works if the script fails to load.
document.documentElement.classList.add("js");


// =========================
// Mobile Navigation
// =========================
const menuButton = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector("#main-navigation");

if (menuButton && mainNavigation) {
    menuButton.addEventListener("click", function () {
        mainNavigation.classList.toggle("open");

        const isOpen = mainNavigation.classList.contains("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });
}
