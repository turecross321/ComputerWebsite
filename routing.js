let navButtons;
let contentParent;
let originalDocTitle;

async function init() {
    navButtons = document.getElementsByClassName("nav-button");
    contentParent = document.getElementById("content-parent");
    originalDocTitle = document.title;

    contentParent.classList.add("hidden");
    await load_pages();
    preload_images();
    goToPage(0);

    contentParent.classList.remove("hidden");
}


function preload_images() {
    const urls = get_image_urls();
    for (let url of urls) {
        preload_image(url);
    }
}

function get_image_urls() {
    image_urls = [];
    for (page of pageContents) {
        images = page.getElementsByTagName('img');

        for (let image of images) {
            image_urls.push(image.src);
        }
    };

    return image_urls;
}

function preload_image(url) {
    let image = new Image();
    image.src = url;
}

const pageContentsDir = "page_contents/";
let pageContents = []
async function load_pages() {
    for (let i = 0; i < navButtons.length; i++) {
        try {
            const response = await fetch(pageContentsDir + i + ".html");
            const html = textToHtml(await response.text());
            pageContents.push(html);
        } catch (e) {
            // add error page
            const error = "<html lang='sv'><main id=\"primary-main\"><h2>Katastrof</h2><p>Routern verkar ha misslyckats med att nå sido-innehållet. Detta har troligtvis hänt för att du har öppnat \"index.html\" filen lokalt, och din webläsare därför inte ger hemsidan tillgång till innehållen. Detta kan du fixa genom att hosta hemsidan på en server, eller genom att starta din webläsare med \"--allow-file-access-from-files\"-flaggan. </p></main></html>";
            pageContents.push(error);
        }
    }
}

function textToHtml(text) {
    var html = document.createElement('div');
    html.innerHTML = text;
    return html;
}

let currentPage = 0;
function goToPage(pageIndex) {
    navButtons[currentPage].classList.remove("nav-button-selected");

    currentPage = Math.min(pageIndex, pageContents.length - 1);
    contentParent.innerHTML = pageContents[currentPage].innerHTML;
    document.title = originalDocTitle + " - " + navButtons[currentPage].innerHTML;

    navButtons[currentPage].classList.add("nav-button-selected");
}
