function reset_effects() {
    const elements = document.querySelectorAll('.effect.effect-active');
    elements.forEach(remove_active_effect_class);
}

function remove_active_effect_class(element) {
    element.classList.remove("effect-active");
}

function enable_effects() {
    const elements = document.querySelectorAll('.effect:not(.effect-active)');
    elements.forEach(add_active_effect_class);
}

function add_active_effect_class(element) {
    const position = element.getBoundingClientRect();
    // checking if element is fully visible
    if (position.top >= 0 && position.bottom <= window.innerHeight) {
        element.classList.add("effect-active");
    }
}
