// Select DOM elements
const loadingPage = document.querySelector(".welcome-page");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const contactSection = document.querySelector(".section-contact");
const navList = document.querySelector(".nav-list");
const template = document.querySelector(".project-items");
const displayTemplate = document.querySelector(".project-list");

// Function to display the template
const templateApi = async () => {
    try {
        const response = await fetch("./project.json");
        if (!response.ok) throw new Error('Network response was not ok');
        const productData = await response.json();
        productData.forEach(projectInfo => {
            const { project, description, image, link } = projectInfo;
            const templateClone = document.importNode(template.content, true);
            templateClone.querySelector("h2").innerText = project;
            templateClone.querySelector(".description").innerText = description;
            templateClone.querySelector(".project-img").src = image;
            templateClone.querySelector(".project-link").href = link;
            displayTemplate.append(templateClone);
        });
    } catch (err) {
        console.log("Failed to fetch file");
        console.error(err);
    }
};

// Function to display the welcome message
const welcomeUser = () => {
    setTimeout(() => {
        loadingPage.style.display = "none";
        sessionStorage.setItem("visited", "true");
        header.style.visibility = "visible";
        footer.style.visibility = "visible";
    }, 3000);
};

// Function to hide the welcome page if the user has visited before
const hideVisitedPage = () => {
    loadingPage.style.display = "none";
};

// Check if the user has visited the page
const userVisit = sessionStorage.getItem("visited");
if (!userVisit) {
    header.style.visibility = "hidden";
    footer.style.visibility = "hidden";
    welcomeUser();
} else {
    hideVisitedPage();
}

// Function to handle the contact form display based on navigation clicks
const handleNavClick = (event) => {
    const clickedLink = event.target.closest('.nav-link');

    if (!clickedLink) return;

    // Manage active class for nav links
    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
    clickedLink.classList.add("active");

    // Show or hide the contact section based on the clicked nav item
    const navItemText = clickedLink.textContent;

    if (navItemText === "Contact") {
        contactSection.style.display = "flex";
        displayTemplate.style.display = "none";
    } else if (navItemText === "Projects") {
        displayTemplate.style.display = "block";
        contactSection.style.display = "none";
    } else {
        displayTemplate.style.display = "none";
        contactSection.style.display = "none";
    }
};

// Check the initial hash to set the display
const initPageDisplay = () => {
    if(window.location.hash === "#contact"){
        contactSection.style.display = "flex";
        displayTemplate.style.display = "none";
    } else if (window.location.hash === "#project"){
        displayTemplate.style.display = "block";
        contactSection.style.display = "none";
    }
};

// Initial setup
initPageDisplay();

// Add event listener for navigation clicks
navList.addEventListener("click", handleNavClick);

// Fetch and display the project templates
templateApi();
