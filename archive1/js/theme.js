let color1, color2, color3, color4;
const lightUrl = "css/themes/light.css";
const darkUrl = "css/themes/dark.css";

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

function refreshTheme() {
    loadColors();
    loadSvgColors();
}

function toggleTheme() {
    document.getElementsByTagName('link')[3].remove();
    let link;
    if (document.getElementById("themeToggle").checked) {
        link = createLink(darkUrl);
        document.querySelector('.content').classList.remove("light");
        document.querySelector('.content').classList.add("dark");
    } else {
        link = createLink(lightUrl);
        document.querySelector('.content').classList.remove("dark");
        document.querySelector('.content').classList.add("light");
    }
    document.getElementsByTagName('head')[0].appendChild(link);
}

function createLink(href) {
    link = document.createElement('link');
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = href;
    link.onload = refreshTheme;
    return link;
}
