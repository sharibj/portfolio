var scrollCount = 0;
var scrollThrottleCount = 25;

function contentScroll(){
    scrollCount++;
    if(scrollCount > scrollThrottleCount){
        enable_effects();
        scrollCount=0;
    }
}

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
}

function activate_effect(card) {
    card.classList.add("effect-active");
}

function test() {
    console.log("test");
}