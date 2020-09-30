let color1, color2, color3, color4;

function initialise() {
    color1 = getComputedStyle(document.documentElement)
        .getPropertyValue('--color1');
    color2 = getComputedStyle(document.documentElement)
        .getPropertyValue('--color2');
    color3 = getComputedStyle(document.documentElement)
        .getPropertyValue('--color3');
    color4 = getComputedStyle(document.documentElement)
        .getPropertyValue('--color4');
}

window.onload = function () {
    initialise();
    includeResources();
    enable_effects();
}

/*  Scroll Throttle and enable effects only when item is scrolled into view completely  */
let scrollCount = 0;
const scrollThrottleCount = 25;

function contentScrolled() {
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

function add_active_effect_class(element) {
    const position = element.getBoundingClientRect();
    // checking if element is fully visible
    if (position.top >= 0 && position.bottom <= window.innerHeight) {
        element.classList.add("effect-active");
    }
}

/******************************************************************************************************/

/*  Load svg resources and set colors according to the selected theme   */
function includeResources() {
    document.querySelectorAll('div[include-resource]').forEach(copyResourceToElement);
}

function copyResourceToElement(element) {
    let file = element.getAttribute("include-resource");
    if (file) {
        const client = new XMLHttpRequest();
        client.open('GET', file);
        client.onreadystatechange = function () {
            element.innerHTML = client.responseText;
            element.removeAttribute("include-resource");
            loadSvgColors();
        }
        client.send();
    }
}

function loadSvgColors() {
    document.querySelectorAll("[id$='_color1']").forEach(setColorToElement, color1);
    document.querySelectorAll("[id$='_color2']").forEach(setColorToElement, color2);
    document.querySelectorAll("[id$='_color3']").forEach(setColorToElement, color3);
    document.querySelectorAll("[id$='_color4']").forEach(setColorToElement, color4);
}

function setColorToElement(itemElement) {
    itemElement.style.fill = this;
    const children = itemElement.children;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        child.style.fill = this;
    }
}

/******************************************************************************************************/