let navButtons;
let contentParent;
let originalDocTitle;

async function init() {
    navButtons = document.getElementsByClassName("nav-button");
    contentParent = document.getElementById("content-parent");
    originalDocTitle = document.title;

    contentParent.classList.add("hidden");
    await load_pages();
    goToPage(0);
    animateContentParent("fade-in");
    contentParent.classList.remove("hidden");
}

function animateContentParent(className) {
    contentParent.classList.remove("fade-in");
    contentParent.classList.add(className);
}

const pageContentsDir = "page_contents/";
let pageContents = []
async function load_pages() {
    for (let i = 0; i < navButtons.length; i++) {
        try {
            const response = await fetch(pageContentsDir + i + ".html");
            const html = await response.text();
            pageContents.push(html);
        } catch (e) {
            // add error page
            pageContents = ["<html lang='sv'><main id=\"primary-main\"><h2>Katastrof</h2><p>Routern verkar ha misslyckats med att nå sido-innehållet. Detta har troligtvis hänt för att du har öppnat \"index.html\" filen lokalt, och din webläsare därför inte ger hemsidan tillgång till innehållen. Detta kan du fixa genom att hosta hemsidan på en server, eller genom att starta din webläsare med \"--allow-file-access-from-files\"-flaggan. </p></main></html>"];
        }
    }
}

let currentPage = 0;
function goToPage(pageIndex) {
    navButtons[currentPage].classList.remove("nav-button-selected");

    currentPage = Math.min(pageIndex, pageContents.length - 1);
    contentParent.innerHTML = pageContents[currentPage];
    document.title = originalDocTitle + " - " + navButtons[currentPage].innerHTML;

    navButtons[currentPage].classList.add("nav-button-selected");
}
