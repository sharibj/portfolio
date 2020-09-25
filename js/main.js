let scrollCount = 0;
const scrollThrottleCount = 25;

window.onload = function () {
    enable_effects();
    load_svg();
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

function add_active_effect_class(element) {
    const position = element.getBoundingClientRect();
    // checking whether fully visible
    if (position.top >= 0 && position.bottom <= window.innerHeight) {
        element.classList.add("effect-active");
    }
}

function load_svg() {
    const colorElements = document.querySelectorAll("[id$='_color']");
    console.log(colorElements);
    colorElements.forEach(setColorToElement)
    const experienceFooter = document.getElementById('experience_footer');
    const workingSvg = document.getElementById('working_svg');
    experienceFooter.innerHTML = workingSvg.innerHTML;
}

function setColorToElement(itemElement) {
    const color2 = getComputedStyle(document.documentElement)
        .getPropertyValue('--color2');
    itemElement.style.fill = color2;
    const children = itemElement.children;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        child.style.fill = color2;
    }
}