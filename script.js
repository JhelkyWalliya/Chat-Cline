// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .hero a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate the distance to scroll
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Smooth scroll to the target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been received. We'll contact you at ${email} soon.`);
            
            // Reset the form
            this.reset();
        });
    }
    
    // Update active menu item on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
    
    // Create mobile menu functionality
    const createMobileMenu = () => {
        // Create mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-btn')) {
            const nav = document.querySelector('nav');
            const header = document.querySelector('header .container');
            
            // Create mobile menu button
            const mobileMenuBtn = document.createElement('div');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
            
            // Insert button before nav
            header.insertBefore(mobileMenuBtn, nav);
            
            // Add click event to toggle menu
            mobileMenuBtn.addEventListener('click', function() {
                nav.classList.toggle('active');
                this.classList.toggle('active');
            });
            
            // Add CSS for mobile menu
            const style = document.createElement('style');
            style.textContent = `
                @media (max-width: 768px) {
                    nav {
                        display: none;
                        width: 100%;
                    }
                    
                    nav.active {
                        display: block;
                    }
                    
                    nav ul {
                        flex-direction: column;
                        align-items: center;
                    }
                    
                    nav ul li {
                        margin: 10px 0;
                    }
                    
                    .mobile-menu-btn {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        width: 30px;
                        height: 25px;
                        cursor: pointer;
                    }
                    
                    .mobile-menu-btn span {
                        height: 3px;
                        width: 100%;
                        background-color: #333;
                        transition: all 0.3s ease;
                    }
                    
                    .mobile-menu-btn.active span:nth-child(1) {
                        transform: translateY(11px) rotate(45deg);
                    }
                    
                    .mobile-menu-btn.active span:nth-child(2) {
                        opacity: 0;
                    }
                    
                    .mobile-menu-btn.active span:nth-child(3) {
                        transform: translateY(-11px) rotate(-45deg);
                    }
                }
            `;
            
            document.head.appendChild(style);
        }
    };
    
    // Initialize mobile menu
    createMobileMenu();
});
