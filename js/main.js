let color1, color2, color3, color4;
let window_width;

function initialise() {
    window_width = window.innerWidth;
    loadColors();
}

function loadColors() {
    color1 = getComputedStyle(document.documentElement)
        .getPropertyValue('--color1');
    color2 = getComputedStyle(document.documentElement)
        .getPropertyValue('--color2');
    color3 = getComputedStyle(document.documentElement)
        .getPropertyValue('--color3');
    color4 = getComputedStyle(document.documentElement)
        .getPropertyValue('--color4');
}

window.onload = pageLoad;

window.onresize = function () {
    if (window.innerWidth !== window_width) {
        [1, 2, 3].forEach(resetDetails);
        reset_effects();
        window_width = window.innerWidth;
    }
};

function pageLoad() {
    initialise();
    includeResources();
    reset_effects();
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
        };
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

function addClassName(selector, className) {
    document.querySelector(selector).classList.add(className);
}

function removeClassName(selector, className) {
    document.querySelector(selector).classList.remove(className);
}

function showDetails(experienceNumber) {
    removeClassName('.experience .card._' + experienceNumber, 'hide');
    removeClassName('.experience .details._' + experienceNumber, 'hide');
    addClassName('.experience .card._' + experienceNumber, 'show');
    addClassName('.experience .details._' + experienceNumber, 'show');
    disableScrollUsingKeys();
    configureArrowVisibility(document.querySelector(".details._2 .responsibilities"));
}

function hideDetails(experienceNumber) {
    addClassName('.experience .card._' + experienceNumber, 'hide');
    addClassName('.experience .details._' + experienceNumber, 'hide');
    removeClassName('.experience .card._' + experienceNumber, 'show');
    removeClassName('.experience .details._' + experienceNumber, 'show');
    enableScrollUsingKeys();
}

function resetDetails(experienceNumber) {
    removeClassName('.experience .card._' + experienceNumber, 'hide');
    removeClassName('.experience .details._' + experienceNumber, 'hide');
    removeClassName('.experience .card._' + experienceNumber, 'show');
    removeClassName('.experience .details._' + experienceNumber, 'show');
    enableScrollUsingKeys();
}

/**/
function disableScrollUsingKeys() {
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function disableScroll() {
    disableScrollUsingKeys();
    window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.addEventListener('wheel', preventDefault, {passive: false});
    window.addEventListener('mousewheel', preventDefault, {passive: false});
    window.addEventListener('touchmove', preventDefault, {passive: false});
}

function enableScrollUsingKeys() {
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
    enableScrollUsingKeys();
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener('wheel', preventDefault, {passive: false});
    window.removeEventListener('mousewheel', preventDefault, {passive: false});
    window.removeEventListener('touchmove', preventDefault, {passive: false});
}

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (e.keyCode >= 32 && e.keyCode <= 40) {
        preventDefault(e);
        return false;
    }
}

function configureArrowVisibility(elem) {
    const maxTop = (elem.scrollHeight - elem.offsetHeight) * 0.93;
    const scrollTop = elem.scrollTop;
    if (scrollTop >= maxTop) {
        elem.parentElement.children[2].setAttribute('style', 'display: none;')
    } else {
        elem.parentElement.children[2].setAttribute('style', 'display: unset;')
    }
    if (scrollTop === 0) {
        elem.parentElement.children[0].setAttribute('style', 'display: none;')
    } else {
        elem.parentElement.children[0].setAttribute('style', 'display: unset;')

    }
}

const lightUrl = "css/themes/light.css";
const darkUrl = "css/themes/dark.css";

function toggleTheme() {
    document.getElementsByTagName('link')[2].remove();
    link = document.createElement('link');
    link.type = "text/css";
    link.rel = "stylesheet";

    if (document.getElementById("themeToggle").checked) {
        link.href = darkUrl;
        document.querySelector('.content').classList.remove("light");
        document.querySelector('.content').classList.add("dark");
    } else {
        link.href = lightUrl;
        document.querySelector('.content').classList.remove("dark");
        document.querySelector('.content').classList.add("light");
    }
    link.onload = function () {
        loadColors();
        loadSvgColors();
    };
    document.getElementsByTagName('head')[0].appendChild(link);
}