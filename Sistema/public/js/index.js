document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    const icon = menuToggle.querySelector("i");
    if (mobileMenu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      const icon = menuToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });

  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", function () {
        img.classList.add("loaded");
      });
      img.addEventListener("error", function () {
        img.src =
          "https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
      });
    }
  });

  if (window.innerWidth > 768) {
    window.addEventListener("scroll", function () {
      const scrollPosition = window.pageYOffset;
      const heroSection = document.querySelector(".hero-premium");
      if (heroSection) {
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + "px";
      }
    });
  }

  document
    .querySelector(".scroll-indicator")
    .addEventListener("click", function () {
      document
        .querySelector("#recursos")
        .scrollIntoView({ behavior: "smooth" });
    });

  function handleScreenSize() {
    if (window.innerWidth > 768) {
      mobileMenu.classList.remove("active");
      const icon = menuToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  }
  window.addEventListener("resize", handleScreenSize);
});