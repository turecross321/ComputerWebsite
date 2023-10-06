let navButtons;
let contentParent;
let originalDocTitle;

async function init() {
    navButtons = document.getElementsByClassName("nav-button");
    contentParent = document.getElementById("content-parent");
    originalDocTitle = document.title;

    await load_pages();
    goToPage(0);
}

const pageContentsDir = "page_contents/";
let pageContents = [];
async function load_pages() {
    for (let i = 0; i < navButtons.length; i++) {
        const response = await fetch(pageContentsDir + i + ".html")
        const html = await response.text();
        pageContents.push(html);
    }

    return;
}

let currentPage = 0;
function goToPage(pageIndex) {
    navButtons[currentPage].classList.remove("nav-button-selected");

    currentPage = pageIndex;
    contentParent.innerHTML = pageContents[currentPage];
    document.title = originalDocTitle + " - " + navButtons[currentPage].innerHTML;

    navButtons[currentPage].classList.add("nav-button-selected");
}
