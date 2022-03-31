var scrollMenu = document.getElementById("scroll-menu");
var scrollMenuElements = scrollMenu?.children;

var sections = Array.from(document.getElementsByClassName("page-section"));
var visibleSection = null;
var isScrollingToClickedSection = false;

var getMenuElement = (section) => scrollMenuElements.namedItem("menu-" + section);

var elementIsVisible = (elem) => {
    let rect = elem.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;

    return elemTop >= 0 && elemBottom <= window.innerHeight;
};

var setVisibleSection = (section) => {
    if (visibleSection != section) {
        getMenuElement(visibleSection?.id)?.classList.remove("active");
        getMenuElement(section?.id)?.classList.add("active");
        visibleSection = section;
    }
};

var setScrollTimer = () => {
    isScrollingToClickedSection = true;
    window.setTimeout(resetScrollTimer, 500);
};

var resetScrollTimer = () => {
    isScrollingToClickedSection = false;
};

Array.from(scrollMenuElements).forEach((element) => {
    element.addEventListener("click", (e) => {
        section = sections.find((el) => "menu-" + el.id == element.id);
        setVisibleSection(section);
        setScrollTimer();
    });
});

// If not mobile, add scroll event listener
if (!/Mobi|Android/i.test(navigator.userAgent)) {
    document.addEventListener("scroll", (e) => {
        if (!isScrollingToClickedSection) {
            section = sections.find(elementIsVisible);
            setVisibleSection(section);
        }
    });
}

var introH1 = document.getElementById("intro");

var split = introH1.innerText.split(" ");
var str = split
    .map(
        (word, i) =>
            `<span style="overflow: hidden"><span id="intro-span-${i}" style="animation-delay: ${
                i * (1 / (split.length + 1))
            }s;">${word}</span></span>`
    )
    .join(" ");
console.log(str);
var spans = document.createRange().createContextualFragment(str);
introH1.replaceChildren(spans);
