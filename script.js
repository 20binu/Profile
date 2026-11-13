// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Publication filters
const filterButtons = document.querySelectorAll(".filter-button");
const publicationCards = document.querySelectorAll(".publication-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    publicationCards.forEach(card => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

// Subtle reveal-on-scroll effect, with a fallback for older browsers
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Keep the footer year current
document.getElementById("year").textContent = new Date().getFullYear();
