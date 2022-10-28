


// Select nav links
const navLink = document.querySelectorAll(".nav-link");


navLink.forEach((link) =>
  link.addEventListener("click", () => {
    ul.classList.remove("show");
  })
);

