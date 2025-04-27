// Navigation
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  mobileMenuBtn?.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
        // Close mobile menu if open
        navLinks.classList.remove("active");
      }
    });
  });

  // Active Navigation Link
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });

  // Contact Form Handling
  const contactForm = document.getElementById("contactForm");
  contactForm?.addEventListener("submit", handleContactSubmit);

  // Animate on Scroll
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("aos-animate");
      }
    });
  }, observerOptions);

  document.querySelectorAll("[data-aos]").forEach((element) => {
    observer.observe(element);
  });
});

// Toast Notification
function showToast(message, duration = 3000) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

// Contact Form Handler
function handleContactSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  // Validate form data
  if (!data.name || !data.email || !data.phone || !data.message) {
    showToast("Mohon lengkapi semua field");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showToast("Format email tidak valid");
    return;
  }

  // Phone validation
  const phoneRegex = /^[0-9+\-\s]{10,}$/;
  if (!phoneRegex.test(data.phone)) {
    showToast("Format nomor telepon tidak valid");
    return;
  }

  // Simulate form submission
  showToast("Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.");
  e.target.reset();
}

// Scroll to Section Helper
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Open Contact Form with Pre-selected Truck
function openContactForm(truckType) {
  const contactSection = document.getElementById("contact");
  const messageField = document.getElementById("message");

  contactSection.scrollIntoView({ behavior: "smooth" });
  if (messageField) {
    messageField.value = `Saya tertarik untuk menyewa ${truckType}. Mohon informasi lebih lanjut.`;
  }
}

// Navbar Scroll Effect
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    navbar.style.transform = "translateY(0)";
  }

  if (currentScroll === 0) {
    navbar.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
  }

  lastScroll = currentScroll;
});
