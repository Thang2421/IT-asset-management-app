const loginBtn = document.querySelector(".login-btn");
const sideBar = document.querySelector(".sidebar");
const pages = [
  "price-list",
  "orders",
  "borrow-devices",
  "repair-tracking",
  "invoice",
];

loginBtn.addEventListener("click", function (e) {
  document.querySelector(".login-page").classList.add("hidden");

  document.querySelector(".app").classList.remove("hidden");
  renderSidebar();
});

const renderSidebar = () => {
  const html = pages
    .map((page) => {
      return `
      <div class="menu-item ${page}">
      <img class="icon" src="IMG/menu-items/${page}.png" />
      </div>`;
    })
    .join("");

  sideBar.innerHTML = html;
};
