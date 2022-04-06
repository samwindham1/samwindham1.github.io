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

    return elemTop >= 0 || elemBottom >= window.innerHeight;
};

var setVisibleSection = (section) => {
    if (!!section && visibleSection != section) {
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

var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

if (!/Mobi|Android/i.test(navigator.userAgent)) {
    var introH1 = document.getElementById("intro");

    var split = introH1.getElementsByClassName("intro-inner")[0].innerText.split(" ");
    var str = split
        .map(
            (word, i) =>
                `<span id="intro-span-${i}" style="animation-delay: ${i * (1 / (split.length + 1))}s;">${word}</span>`
        )
        .join(" ");
    var spans = document.createRange().createContextualFragment(str);
    introH1.replaceChildren(spans);
} else {
    var introH1 = document.getElementById("intro");
    introH1.style.opacity = 1;
}

//
// Add tabs to gist examples
//

var createElementFromHTML = (htmlString) => {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();

    return div.firstChild;
};

var hideAllElements = (elements) => {
    elements.forEach((element) => {
        element.style.display = "none";
    });
};

var gist_examples = Array.from(document.getElementsByClassName("gist"));
gist_examples.forEach((gist) => {
    let files = Array.from(gist.getElementsByClassName("gist-file"));
    if (files.length > 1) {
        let header = createElementFromHTML(`<div class='gist-header'></div>`);
        hideAllElements(files);
        files[0].style.display = "block";

        files.forEach((file, index) => {
            let filename = file.getElementsByTagName("a")[1].innerText.trim();
            let tab = createElementFromHTML(
                `<div class='gist-tab${index == 0 ? " active" : ""}'>` + filename + "</div>"
            );
            tab.addEventListener("click", (e) => {
                hideAllElements(files);
                file.style.display = "block";
                Array.from(header.getElementsByClassName("active")).forEach((tab) => tab.classList.remove("active"));
                tab.classList.add("active");
            });
            header.appendChild(tab);
        });
        gist.prepend(header);
    }
});
