document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    const isMobile = window.innerHeight < 700;  
    const thresholdValue = isMobile ? 0.3 : 0.6;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove("active"));
                    const id = entry.target.getAttribute("id");
                    const activeLink = document.querySelector(`nav a[href="#${id}"]`);
                    if (activeLink) activeLink.classList.add("active");
                }
            });
        },
        { threshold: thresholdValue }
    );

    sections.forEach(section => observer.observe(section));
});