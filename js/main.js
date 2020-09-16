function enable_effects() {
    var elements = document.querySelectorAll('.effect:not(.effect-active)');
    elements.forEach(add_active_effect_class);

}

function add_active_effect_class(element, index) {
    var position = element.getBoundingClientRect();
    // checking whether fully visible
    if (position.top >= 0 && position.bottom <= window.innerHeight) {
        element.classList.add("effect-active");
    }

    // // checking for partial visibility
    // if (position.top < window.innerHeight && position.bottom >= 0) {
    //     console.log('Element is partially visible in screen');
    // }
}

function activate_effect(card) {
    card.classList.add("effect-active");
}

function test() {
    console.log("test");
}