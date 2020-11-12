let window_width;
let scrollCount = 0;
const scrollThrottleCount = 25;

window.onload = pageLoad;

window.onresize = function () {
    if (window.innerWidth !== window_width) {
        [1, 2, 3].forEach(resetDetails);
        reset_effects();
        window_width = window.innerWidth;
    }

};

function pageLoad() {
    includeResources();
    initialise();
    reset_effects();
    enable_effects();

}

function initialise() {
    window_width = window.innerWidth;
    refreshTheme();
    addSwipeListeners(3);
}

function contentScrolled() {
    scrollCount++;
    if (scrollCount > scrollThrottleCount) {
        enable_effects();
        scrollCount = 0;
    }
}

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
            refreshTheme();
        };
        client.send();
    }
}

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
    addClassName('.experience .card._' + experienceNumber, 'effect-active');
    addClassName('.experience .details._' + experienceNumber, 'show');
    disableScrollUsingKeys();
    configureArrowVisibility(document.querySelector(".details._2 .responsibilities"));
}

function hideDetails(experienceNumber) {
    addClassName('.experience .card._' + experienceNumber, 'hide');
    addClassName('.experience .card._' + experienceNumber, 'effect-active');
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

const scrollSize = window.innerHeight * 0.8;

function scrollUp(index) {
    document.querySelector('.details._' + index + ' .responsibilities').scrollBy(0, -scrollSize);
}

function scrollDown(index) {
    document.querySelector(".details._" + index + " .responsibilities").scrollBy(0, scrollSize);
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
