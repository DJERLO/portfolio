document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");
    
    // --- Intersection Observer Logic (Handles visibility and navigation highlighting) ---
    const isMobile = window.innerHeight < 768;  
    const thresholdValue = isMobile ? 0.25 : 0.6;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {

                // Fade-in behavior
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
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

    
    // --- NEW: Card Flip Initialization (Integration of Click-to-Flip logic) ---
    const cards = document.querySelectorAll('.card-container');
    
    cards.forEach(container => {
        // Initialize a data attribute to store the current rotation state
        // This is a cleaner way than relying solely on the 'flipped' class
        container.dataset.rotation = 0; 

        container.addEventListener('click', function() {
            // Get the current rotation value (defaults to 0 if not set)
            let currentRotation = parseInt(this.dataset.rotation);

            // Calculate the next rotation: add 180 degrees
            let nextRotation = currentRotation + 180;

            // Update the CSS transform property directly on the INNER .card element
            // We use querySelector here to target the rotating element
            const innerCard = this.querySelector('.card');
            if (innerCard) {
                innerCard.style.transform = `rotateY(${nextRotation}deg)`;
            }

            // Store the new rotation value back into the data attribute
            this.dataset.rotation = nextRotation;
            
            // OPTIONAL: Still toggle the 'flipped' class for styling (RGB glow, movement)
            this.classList.toggle('flipped');
        });
    });
    // --- END Card Flip Initialization ---
});


// --- Other functions and listeners (These are outside DOMContentLoaded and don't need to move) ---

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

// Button Scroll to Top
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

(function() {
    const trackingId = 'G-C3TQQMTVFB';

    // 1. Inject the external Google Tag script tag asynchronously
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(gaScript);

    // 2. Setup the global dataLayer and gtag logic
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
        window.dataLayer.push(arguments);
    };

    // 3. Initialize tracking configurations
    window.gtag('js', new Date());
    window.gtag('config', trackingId);
})();