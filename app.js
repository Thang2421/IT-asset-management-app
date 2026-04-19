const pages = [
  "price-list",
  "orders",
  "borrow-devices",
  "repair-tracking",
  "invoice",
];

const mainData = {
  orders: [
    {
      id: 1776633369848,
      date: "23:16:09 19/4/2026",
      name: "123",
      ico: "123",
      tel: "123",
      device: "c660",
      status: "paid",
      location: "g-floor",
      comment: "",
    },
    {
      id: 12,
      date: "23:16:09 19/4/2026",
      name: "234",
      ico: "234",
      tel: "234",
      device: "c660",
      status: "unpaid",
      location: "g-floor",
      comment: "",
    },
  ],
  borrow: [],
  repair: [],
};

// Login Page Listent for Login Btn
// loginBtn.addEventListener("click", function () {
//   document.querySelector(".login-page").classList.add("hidden");

//   document.querySelector(".app").classList.remove("hidden");
//   renderSidebar();
// });

// Sidebar Rendering
const renderSidebar = () => {
  const sideBar = document.querySelector(".sidebar");
  const html = pages
    .map((page) => {
      return `
        <div class="menu-item ">
        <img class="icon" data-page='${page}' src="IMG/menu-items/${page}.png" />
        </div>`;
    })
    .join("");

  sideBar.innerHTML = html;
  // console.log(html);
};

function renderActiveMenuItem(chosenMenuItem) {
  const allMenuItem = document.querySelectorAll(".menu-item").forEach((el) => {
    el.classList.remove("active");
  });

  chosenMenuItem.closest("div").classList.add("active");
}

// Render the main page
function renderPage(page) {
  const main = document.querySelector(".main");
  let html;
  if (page === "orders") {
    html = `
    <div class='main-header'>
        <h1 class='page-header'>Customer Orders (Reserved/ Paid Devices)</h1>
        <div class = 'add-btn-container'>
            <img class="add-btn-img"  src="IMG/add.png" />
        </div>
    </div>
    <div class="main-body"></div>
    `;
  } else if (page === "borrow-devices") {
    html = `
    <div class='main-header'>
        <h1 class='page-header'>Borrowed Device Management</h1>
        <div class = 'add-btn-container'>
            <img class="add-btn-img"  src="IMG/add.png" />
        </div>
    </div>
    <div class="main-body"></div>
    `;
  } else if (page === "repair-tracking") {
    html = `
    <div class='main-header'>
        <h1 class='page-header'>Repair & Warranty Tracking</h1>
        <div class = 'add-btn-container'>
            <img class="add-btn-img"  src="IMG/add.png" />
        </div>
    </div>
    <div class="main-body"></div>

    `;
  }
  main.innerHTML = html;
}

function getObjDataFromBox(id) {
  const targetObjectFromOrder = mainData.orders.find((order) => {
    return order.id === +id;
  });
  return targetObjectFromOrder;
}

function renderForm(obj) {
  const formhtml = `
    <div class="overlay ">

    <div class="form ">
      <!-- TOP -->
      <div class="form-top">
      ${obj?.id ? `<h1>Update Order Info</h1>` : `<h1>New Order Info</h1>`}
      </div>
      <!-- MIDDLE -->
      <div class="form-body">
        <form class="modal-form" data-id='${obj?.id || ""}'>
          <div class="modal-form-body">
            <div class="modal-form-body-left">
              <div class="form-group">
                <label for="name">Name</label>
                <input id="name" type="text" value='${obj?.name || ""}'/>
              </div>

              <div class="form-group">
                <label for="ico">ICO</label>
                <input id="ico" type="text" value='${obj?.ico || ""}'/>
              </div>

              <div class="form-group">
                <label for="tel">Tel</label>
                <input id="tel" type="number" value='${obj?.tel || ""}'/>
              </div>
              <div class="form-group">
                <label>Status</label>

                <label>
                  <input type="radio" name="order_status" value="paid" ${obj?.status === "paid" ? "checked" : ""} />
                  PAID
                </label>

                <label>
                  <input type="radio" name="order_status" value="unpaid" ${obj?.status === "unpaid" ? "checked" : ""} />
                  UNPAID
                </label>
              </div>
            </div>
            <div class="modal-form-body-right">
              <div class="form-group">
                <label for="device">Device</label>
                <select id="device">
                  <option value="">Select device</option>
                  <option value="c660" ${obj?.device === "c660" ? "selected" : ""}>C660</option>
                  <option value="p70-1" ${obj?.device === "p70-1" ? "selected" : ""}>P70-1</option>
                  <option value="p70-2" ${obj?.device === "p70-2" ? "selected" : ""}>P70-2</option>
                </select>
              </div>
              <div class="form-group">
                <label for="location">Location</label>
                <select id="location">
                  <option value=''>Select locaiton</option>
                  <option value="g-floor" ${obj?.location === "g-floor" ? "selected" : ""}>Ground Floor</option>
                  <option value="s-floor" ${obj?.location === "s-floor" ? "selected" : ""}>Second Floor</option>
                </select>
              </div>

              <div class="form-group">
                <label for="comments">Comments</label>
                <textarea id="comments">${obj?.comment || ""}</textarea>
              </div>
            </div>
          </div>

          ${
            obj?.id
              ? `<div class='btn-container'> 
              <div class="modal-form-submit">
                <button class="form-btn update-btn" type="submit">Update</button>
               </div>
              <div class="modal-form-submit">
                <button class="form-btn finish-btn">Finish</button>
              </div>
            </div>`
              : `<div class="modal-form-submit">
                <button class="form-btn submit-btn" type="submit">Submit</button>
             </div>`
          }

   
        </form>
        </div>`;

  document.body.insertAdjacentHTML("afterbegin", formhtml);
}

function removeForm() {
  const overlay = document.querySelector(".overlay");
  overlay.remove();
}

function renderMainOrders() {
  const mainBody = document.querySelector(".main-body");

  const html = mainData.orders
    .map((order) => {
      return `
    <div class="main-body-data">
        <div class="box" id='${order.id}'>
            <div class="box-order-status ${order.status === "paid" ? "paid-background" : "unpaid-background"}"></div>
            <div class="box-order-data">
                <h1>Name: ${order.name}</h1>
                <h1>ICO: ${order.ico}</h1>
                <h1>Tel: ${order.tel}</h1>
            </div>
        </div>
        <h2>Created on: ${order.date.slice(9)}</h2>
    </div>`;
    })
    .join(" ");

  mainBody.innerHTML = html;
}

function addMainData() {
  const name = document.querySelector("#name").value;
  const ico = document.querySelector("#ico").value;
  const tel = document.querySelector("#tel").value;
  const device = document.querySelector("#device").value;
  const status = document.querySelector(
    'input[name="order_status"]:checked',
  )?.value;
  const location = document.querySelector("#location").value;
  const comment = document.querySelector("#comments").value;

  const dataFormValue = {
    id: Date.now(),
    date: new Date().toLocaleString("cz-CZ"),
    name: name,
    ico: ico,
    tel: tel,
    device: device,
    status: status,
    location: location,
    comment: comment,
  };

  if (!ico || !device || !status) {
    alert("Please fill required fields");
    return;
  }

  console.log(dataFormValue);

  // if data object is not exists
  mainData.orders.push(dataFormValue);

  const form = document.querySelector(".form");
  form.remove();
}

function updateMainData(id) {
  const objData = getObjDataFromBox(id);
  const updatedObjData = {
    id: objData.id,
    date: objData.date,
    name: document.querySelector("#name").value,
    ico: document.querySelector("#ico").value,
    tel: document.querySelector("#tel").value,
    device: document.querySelector("#device").value,
    status: document.querySelector('input[name="order_status"]:checked')?.value,
    location: document.querySelector("#location").value,
    comment: document.querySelector("#comments").value,
  };

  const indexData = findIndexFromId(id);
  mainData.orders[indexData] = updatedObjData;
}

function deleteMainData(id) {
  const indexData = findIndexFromId(id);
  mainData.orders.splice(indexData, 1);
}

function findIndexFromId(id) {
  return mainData.orders.findIndex((order) => {
    return +order.id == id;
  });
}

function renderMainPageStructure() {
  const mainPageHtml = `
    <div class="app">
      <div class="sidebar"></div>
      <div class="main"></div>
    </div>`;

  document.body.innerHTML = mainPageHtml;
}

document.body.addEventListener("click", function (e) {
  // User Login
  const loginBtn = document.querySelector(".login-btn");
  if (e.target === loginBtn) {
    const loginPage = document.querySelector(".login-page");
    loginPage.remove();
    renderMainPageStructure();
    renderSidebar();
    return;
  }

  // User choose menu-item
  if (e.target.classList.contains("icon")) {
    const chosenMenuItem = e.target;
    renderActiveMenuItem(chosenMenuItem);
    const page = e.target.dataset.page;
    renderPage(page);
    renderMainOrders();
    return;
  }

  // User choose Orders menu-item
  console.log(e.target);

  // User choose Borrow menu-item

  // User choose Repair menu-item

  // User add Main Object
  const addBtn = document.querySelector(".add-btn-img");
  if (e.target === addBtn) {
    renderForm();
    return;
  }

  // If overlay were selected
  const overlay = e.target.closest(".overlay");
  if (overlay === e.target) {
    overlay.remove();
    return;
  }

  // If Box were selected
  const box = e.target.closest(".box");
  if (box) {
    const objData = getObjDataFromBox(box.id);
    renderForm(objData);
    return;
  }

  const submitBtn = e.target.closest(".submit-btn");
  if (e.target === submitBtn) {
    e.preventDefault();
    addMainData();
    removeForm();
    renderMainOrders();
    return;
  }

  const updateBtn = e.target.closest(".update-btn");
  if (e.target === updateBtn) {
    e.preventDefault();
    const id = e.target.closest(".modal-form").dataset.id;
    updateMainData(id);
    removeForm();
    renderMainOrders();
    return;
  }

  const finishBtn = e.target.closest(".finish-btn");
  if (e.target === finishBtn) {
    e.preventDefault();
    const id = e.target.closest(".modal-form").dataset.id;
    deleteMainData(id);
    removeForm();
    renderMainOrders();
    return;
  }
});
