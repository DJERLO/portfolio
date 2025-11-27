document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    const isMobile = window.innerHeight < 768;  
    const thresholdValue = isMobile ? 0.3 : 0.6;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {

                // Fade-in behavior
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }else{
                    entry.target.classList.remove("visible");
                }
                
                // Navigation
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove("active"));
                    const id = entry.target.getAttribute("id");
                    
                    const activeDesktopLink = document.querySelector(`nav ul.nav-list-desktop a[href="#${id}"]`);
                    const activeMobileLink = document.querySelector(`nav ul.nav-list-mobile a[href="#${id}"]`);
                    
                    if (activeDesktopLink && activeMobileLink) {
                        
                        activeDesktopLink.classList.add("active");
                        activeMobileLink.classList.add("active");
                        
                    }
                }
            });
        },
        { threshold: thresholdValue }
    );

    sections.forEach(section => observer.observe(section));
});

const mobileMenu = document.getElementById("mobile-menu");

function showMobileMenu() {
  
  if (mobileMenu.style.display === "block") {
    mobileMenu.style.display = "none";
  } else {
    mobileMenu.style.display = "block";
  }
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
       mobileMenu.style.display = "none";
    }
});

//Button Scroll to Top
const scrollTopButton = document.getElementById("scroll-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollTopButton.style.display = "block";
    } else {
        scrollTopButton.style.display = "none";
    }
});

scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});