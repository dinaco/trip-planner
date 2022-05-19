document.addEventListener(
  "DOMContentLoaded",
  () => {
    let nav = document.querySelector(".navbar");
    let navLink = document.querySelectorAll(".nav-link");
    const currentPath = location.pathname;
    for (let i = 0; i < navLink.length; i++) {
      if (currentPath === navLink[i].getAttribute("href")) {
        navLink[i].parentNode.classList.add("active");
      }
    }
  },
  false
);
