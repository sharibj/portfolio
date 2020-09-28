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
    load_svg_colors();
    const experienceFooter = document.getElementById('experience_footer');
    const workingSvg = document.getElementById('working_svg');
    experienceFooter.innerHTML = workingSvg.innerHTML;


    const skillsFooter = document.getElementById('skills_footer');
    const activitySvg = document.getElementById('activity_svg');
    skillsFooter.innerHTML = activitySvg.innerHTML;
}


function load_svg_colors() {
    const color1 = getComputedStyle(document.documentElement)
        .getPropertyValue('--color1');
    const color2 = getComputedStyle(document.documentElement)
        .getPropertyValue('--color2');
    const color3 = getComputedStyle(document.documentElement)
        .getPropertyValue('--color3');
    const color4 = getComputedStyle(document.documentElement)
        .getPropertyValue('--color4');


    document.querySelectorAll("[id$='_color1']").forEach(setColorToElement, color1);
    document.querySelectorAll("[id$='_color2']").forEach(setColorToElement, color2);
    console.log(document.querySelectorAll("[id$='_color2']"));
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