const loginBtn = document.querySelector(".login-btn");
const sideBar = document.querySelector(".sidebar");
const pages = [
  "price-list",
  "orders",
  "borrow-devices",
  "repair-tracking",
  "invoice",
];

// Login Page Listent for Login Btn
loginBtn.addEventListener("click", function (e) {
  document.querySelector(".login-page").classList.add("hidden");

  document.querySelector(".app").classList.remove("hidden");
  renderSidebar();
});

// Sidebar Rendering
const renderSidebar = () => {
  const html = pages
    .map((page) => {
      return `
        <div class="menu-item ">
        <img class="icon ${page}" src="IMG/menu-items/${page}.png" />
        </div>`;
    })
    .join("");

  sideBar.innerHTML = html;
};

// Main Page listen for menu-item
sideBar.addEventListener("click", function (e) {
  if (!e.target.classList.contains("icon")) return;

  const allMenuItem = document.querySelectorAll(".menu-item").forEach((el) => {
    el.classList.remove("active");
  });

  e.target.closest("div").classList.add("active");
});
