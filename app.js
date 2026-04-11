const loginBtn = document.querySelector(".login-btn");
const sideBar = document.querySelector(".sidebar");
const pages = [
  "price-list",
  "orders",
  "borrow-devices",
  "repair-tracking",
  "invoice",
];
const main = document.querySelector(".main");

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
        <img class="icon" data-page='${page}' src="IMG/menu-items/${page}.png" />
        </div>`;
    })
    .join("");

  sideBar.innerHTML = html;
};

// Main Page listen for menu-item, Opacy corespoding to selcted menu -tem
sideBar.addEventListener("click", function (e) {
  if (!e.target.classList.contains("icon")) return;

  const allMenuItem = document.querySelectorAll(".menu-item").forEach((el) => {
    el.classList.remove("active");
  });

  e.target.closest("div").classList.add("active");
  const page = e.target.dataset.page;
  renderPage(page);
});

function renderPage(page) {
  console.log(page);
  let html;
  if (page === "orders") {
    html = `
    <div class='main-header'>
    <h1 class='page-header'>Customer Orders (Reserved/ Paid Devices)</h1>
    <div class = 'add-btn-container'>
        <img class="add-btn-img"  src="IMG/add.png" />
    </div>
    <div>
    `;
  } else if (page === "borrow-devices") {
    html = `
    <div class='main-header'>
    <h1 class='page-header'>Borrowed Device Management</h1>
    <div class = 'add-btn-container'>
        <img class="add-btn-img"  src="IMG/add.png" />
    </div>
    <div>
    `;
  } else if (page === "repair-tracking") {
    html = `
    <div class='main-header'>
    <h1 class='page-header'>Repair & Warranty Tracking</h1>
    <div class = 'add-btn-container'>
        <img class="add-btn-img"  src="IMG/add.png" />
    </div>
    <div>
    `;
  }

  main.innerHTML = html;
}
