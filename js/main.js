let scrollCount = 0;
const scrollThrottleCount = 25;
window.onload = function () {
    enable_effects();
}

function contentScroll() {
    scrollCount++;
    if (scrollCount > scrollThrottleCount) {
        enable_effects();
        scrollCount = 0;
    }
}

function enable_effects() {
    const elements = document.querySelectorAll('.effect:not(.effect-active)');
    elements.forEach(add_active_effect_class);
}

function add_active_effect_class(element, index) {
    const position = element.getBoundingClientRect();
    // checking whether fully visible
    if (position.top >= 0 && position.bottom <= window.innerHeight) {
        element.classList.add("effect-active");
    }
}