// Select DOM elements
const elements = {
    loadingPage: document.querySelector(".welcome-page"),
    header: document.querySelector("header"),
    footer: document.querySelector("footer"),
    contactSection: document.querySelector(".section-contact"),
    navList: document.querySelector(".nav-list"),
    template: document.querySelector(".project-items"),
    displayTemplate: document.querySelector(".project-list"),
    project: document.querySelector(".sourceCode"),
    home: document.querySelector(".home-section"),
    aboutBtn: document.querySelector(".about-btn")
};

// Function to display the template
const templateApi = async () => {
    try {
        const response = await fetch("./project.json");
        if (!response.ok) throw new Error('Network response was not ok');
        const productData = await response.json();
        const fragment = document.createDocumentFragment();

        productData.forEach(projectInfo => {
            const { project, description, image, link } = projectInfo;
            const templateClone = document.importNode(elements.template.content, true);
            templateClone.querySelector("h3").innerText = project;
            templateClone.querySelector(".description").innerText = description;
            templateClone.querySelector(".project-img").src = image;
            templateClone.querySelector(".project-link").href = link;
            fragment.appendChild(templateClone);
        });
        elements.displayTemplate.appendChild(fragment);
    } catch (err) {
        console.log("Failed to fetch file");
        console.error(err);
    }
};

// Function to display the welcome message
const welcomeUser = () => {
    setTimeout(() => {
        elements.loadingPage.style.display = "none";
        sessionStorage.setItem("visited", "true");
        elements.header.style.visibility = "visible";
        elements.footer.style.visibility = "visible";
    }, 3000);
};

// Function to hide the welcome page if the user has visited before
const hideVisitedPage = () => {
    elements.loadingPage.style.display = "none";
};

// Check if the user has visited the page
const userVisit = sessionStorage.getItem("visited");
if (!userVisit) {
    elements.header.style.visibility = "hidden";
    elements.footer.style.visibility = "hidden";
    welcomeUser();
} else {
    hideVisitedPage();
}

// Function to handle the contact form display based on navigation clicks
const handleNavClick = () => {
    const hash = window.location.hash;
    if (hash === "#about") {
        elements.displayTemplate.style.display = "none";
        elements.contactSection.style.display = "none";
        elements.project.style.display = "none";
        elements.home.style.display = "none";
    } else if (hash === "#project") {
        elements.displayTemplate.style.display = "block";
        elements.contactSection.style.display = "none";
        elements.project.style.display = "flex";
        elements.home.style.display = "none";
    } else if (hash === "#contact") {
        elements.contactSection.style.display = "flex";
        elements.displayTemplate.style.display = "none";
        elements.project.style.display = "none";
        elements.home.style.display = "none";
    } else {
        console.log("failed to get the file");
    }
}

// Display page based on navigation click
const displayPage = (event) => {
    const clickedLink = event.target.closest('.nav-link');

    if (!clickedLink) {
        return;
    }

    const getHash = clickedLink.getAttribute("href");
    window.location.hash = getHash;
};

if(!window.location.hash) {
    window.location.hash = "#home"
}

handleNavClick();

// Add event listener for navigation clicks
elements.navList.addEventListener("click", displayPage);
elements.aboutBtn.addEventListener("click", displayPage);
window.addEventListener('hashchange', handleNavClick);

// Fetch and display the project templates
templateApi();