/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let sections = document.querySelectorAll("section[id*=section]");
let navbar = document.querySelector("#navbar__list");
let upButton = document.querySelector(".up");
let scrollingTimer;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildListItems(){
    sections.forEach(function (section){
        let listItem = document.createElement("li");
        listItem.innerHTML = `<a href="#${section.getAttribute("id")}" data-nav="${section.getAttribute("data-nav")}" class="menu__link">${section.getAttribute("data-nav")}</a>`;

        navbar.appendChild(listItem);
    });
}
// Add class 'active' to section when near top of viewport
function makeActive(){
    sections.forEach(function (section){
        let navItem = navbar.querySelector(`[data-nav="${section.dataset.nav}"]`);
        const box = section.getBoundingClientRect();
        if (box.top <= 150 && box.top >= -400) {
            section.classList.add("active");
            navItem.classList.add("active-link");
        }
        else {
            section.classList.remove("active");
            navItem.classList.remove("active-link");
        }
    });
}

// Scroll to anchor ID using scrollTO event
function scrollToId(target){
    let id = target.getAttribute("href").substring(1); //get section id without "#"
    let section = document.getElementById(id);
    section.scrollIntoView({
        behavior: "smooth"
    });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/
//Scroll to Top on Refresh
window.addEventListener("beforeunload", function (){
    window.scrollTo(0, 0);
});

// Build menu
window.addEventListener("load", function (){
    buildListItems();
});

// Scroll to section on link click
document.addEventListener("click", function (e){
    if(e.target.className === "menu__link"){
        e.preventDefault();
        scrollToId(e.target);
    }
});

//Hide Navbar while not Scrolling
window.addEventListener("scroll", function (){
    navbar.style.display = "block";
    clearTimeout(scrollingTimer);
    scrollingTimer = setTimeout(function (){
        navbar.style.display = "none";
    }, 1500);
});

// Set sections as active
window.addEventListener("scroll", function (){
    if(window.scrollY > 0){
        makeActive();
    }
});

//Display Up Button
window.addEventListener("scroll", function (){
    if(window.scrollY >= 400){
        upButton.style.display = "block";
    }
    else
        upButton.style.display = "none";
});

//Add Up Button Click Event
upButton.addEventListener("click", function (){
    window.scrollTo({
        top:0,
        left:0,
        behavior:"smooth"
    });
});

