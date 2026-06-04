// ======================
// FAQ Accordion
// ======================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {

        faqItems.forEach(other => {
            if(other !== item){
                other.classList.remove("active");
            }
        });

        item.classList.toggle("active");
    });

});

// ======================
// Navbar Scroll Effect
// ======================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.style.background = "rgba(0,0,0,0.95)";
        header.style.borderBottom = "1px solid #333";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";

    }else{

        header.style.background = "rgba(0,0,0,0.75)";
        header.style.borderBottom = "1px solid #222";
        header.style.boxShadow = "none";

    }

});

// ======================
// Scroll Animation
// ======================

const animatedElements = document.querySelectorAll(
    ".feature-card, .item, .pricing-card, .course-card, .about, .faq-item"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

},{
    threshold:0.15
});

animatedElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(50px)";
    element.style.transition = "all 0.8s ease";

    observer.observe(element);

});

// ======================
// Counter Animation
// ======================

function animateNumber(element, target){

    let current = 0;

    const increment = target / 60;

    const timer = setInterval(() => {

        current += increment;

        if(current >= target){

            current = target;
            clearInterval(timer);
        }

        element.textContent =
            Math.floor(current).toLocaleString("fa-IR");

    },20);

}

// ======================
// Smooth Button Effects
// ======================

const buttons = document.querySelectorAll(
    ".primary-btn, .secondary-btn, .nav-btn, button"
);

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transition = "0.3s";
        button.style.transform = "translateY(-3px)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translateY(0)";

    });

});

// ======================
// Hero Fade In
// ======================

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});

// ======================
// Reveal Sections
// ======================

const sections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show-section");

        }

    });

},{
    threshold:0.1
});

sections.forEach(section => {

    section.classList.add("hidden-section");
    sectionObserver.observe(section);

});

// ======================
// Floating Glow Effect
// ======================

document.addEventListener("mousemove", (e) => {

    const glow = document.querySelector(".cursor");

    if(!glow) return;

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

// ======================
// Console Branding
// ======================

console.log(`
██████╗ ██╗███████╗██╗   ██╗ █████╗ ██╗
██╔══██╗██║██╔════╝██║   ██║██╔══██╗██║
██████╔╝██║███████╗██║   ██║███████║██║
██╔══██╗██║╚════██║██║   ██║██╔══██║██║
██████╔╝██║███████║╚██████╔╝██║  ██║███████╗
╚═════╝ ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝

Visual Elino
`);
