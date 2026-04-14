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

const mainData = {
  order: [],
  borrow: [],
  repair: [],
};

// Login Page Listent for Login Btn
loginBtn.addEventListener("click", function () {
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

// Main Page listen for menu-item, Opacy corespoding to selcted menu-item
sideBar.addEventListener("click", function (e) {
  if (!e.target.classList.contains("icon")) return;

  const allMenuItem = document.querySelectorAll(".menu-item").forEach((el) => {
    el.classList.remove("active");
  });

  e.target.closest("div").classList.add("active");
  const page = e.target.dataset.page;
  renderPage(page);
});

// Render the main page
function renderPage(page) {
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

  const addBtn = document.querySelector(".add-btn-img");

  addBtn.addEventListener("click", renderForm);
}

function renderForm() {
  formhtml = `
    <div class="form">
      <!-- TOP -->
      <div class="form-top">
        <h1>New Order Info</h1>
      </div>
      <!-- MIDDLE -->
      <div class="form-body">
        <form class="modal-form">
          <div class="modal-form-body">
            <div class="modal-form-body-left">
              <div class="form-group">
                <label for="name">Name</label>
                <input id="name" type="text" />
              </div>

              <div class="form-group">
                <label for="ico">ICO</label>
                <input id="ico" type="text" />
              </div>

              <div class="form-group">
                <label for="tel">Tel</label>
                <input id="tel" type="number" />
              </div>
              <div class="form-group">
                <label>Status</label>

                <label>
                  <input type="radio" name="order_status" value="paid" />
                  PAID
                </label>

                <label>
                  <input type="radio" name="order_status" value="unpaid" />
                  UNPAID
                </label>
              </div>
            </div>
            <div class="modal-form-body-right">
              <div class="form-group">
                <label for="device">Device</label>
                <select id="device">
                  <option value="">Select device</option>
                  <option value="c660">C660</option>
                  <option value="p70-1">P70-1</option>
                  <option value="p70-2">P70-2</option>
                </select>
              </div>

              <div class="form-group">
                <label for="location">Location</label>
                <select id="location">
                  <option value="">Select location</option>
                  <option value="ground-f">Ground floor</option>
                  <option value="2nd-f">Second floor</option>
                </select>
              </div>

              <div class="form-group">
                <label for="comments">Comments</label>
                <textarea id="comments"></textarea>
              </div>
            </div>
          </div>

          <div class="modal-form-submit">
            <button type="submit">Submit</button>
          </div>
        </form>`;
  document.body.insertAdjacentHTML("afterbegin", formhtml);
  const form = document.querySelector(".modal-form");

  form.addEventListener("submit", formSubmission);
}

function formSubmission(e) {
  e.preventDefault();
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

  mainData.order.push(dataFormValue);

  const form = document.querySelector(".form");
  form.remove();

  renderMainOrder();
}

function renderMainOrder() {
  const mainBody = document.querySelector(".main-body");

  const html = mainData.order
    .map((order) => {
      console.log(order.date);
      return `
    <div class="main-body-data">
        <div class="box" id='${order.id}'>
            <div class="box-order-status"></div>
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

  //   const { name, ico, tel } = mainData.order[0];
  //   mainBody.innerHTML = `          <div class="main-body-data">
  //             <div class="box">
  //               <div class="box-order-status"></div>
  //               <div class="box-order-data">
  //                 <h1>Name: ${name}</h1>
  //                 <h1>ICO: ${ico}</h1>
  //                 <h1>Tel: ${tel}</h1>
  //               </div>
  //             </div>
  //             <h2>Date: 20.04.2024</h2>
  //           </div>`;
}

const mainBody = document.querySelector(".main");

mainBody.addEventListener("click", function (ev) {
  const box = ev.target.closest(".box");
  if (!box) return;

  const chosenDataIndex = mainData.order.findIndex(function checkingId(data) {
    return data.id === +box.id;
  });
  console.log(chosenDataIndex);
  if (chosenDataIndex === -1) return;

  formhtml = `
    <div class="form">
      <!-- TOP -->
      <div class="form-top">
        <h1>New Order Info</h1>
      </div>
      <!-- MIDDLE -->
      <div class="form-body">
        <form class="modal-form">
          <div class="modal-form-body">
            <div class="modal-form-body-left">
              <div class="form-group">
                <label for="name">Name</label>
                <input id="name" type="text" value='${mainData.order[chosenDataIndex].name}' />
              </div>

              <div class="form-group">
                <label for="ico">ICO</label>
                <input id="ico" type="text" value='${mainData.order[chosenDataIndex].ico}' />
              </div>

              <div class="form-group">
                <label for="tel">Tel</label>
                <input id="tel" type="number" value='${mainData.order[chosenDataIndex].tel}' />
              </div>
              <div class="form-group">
                <label>Status</label>

                <label>
                  <input type="radio" name="order_status" value="paid" />
                  PAID
                </label>

                <label>
                  <input type="radio" name="order_status" value="unpaid" />
                  UNPAID
                </label>
              </div>
            </div>
            <div class="modal-form-body-right">
              <div class="form-group">
                <label for="device">Device</label>
                <select id="device">
                  <option value='${mainData.order[chosenDataIndex].device}' >Select device</option>
                  <option value="c660">C660</option>
                  <option value="p70-1">P70-1</option>
                  <option value="p70-2">P70-2</option>
                </select>
              </div>

              <div class="form-group">
                <label for="location">Location</label>
                <select id="location">
                  <option value='${mainData.order[chosenDataIndex].location}' >Select location</option>
                  <option value="ground-f">Ground floor</option>
                  <option value="2nd-f">Second floor</option>
                </select>
              </div>

              <div class="form-group">
                <label for="comments">Comments</label>
                <textarea id="comments" value='${mainData.order[chosenDataIndex].comment}' ></textarea>
              </div>
            </div>
          </div>

          <div class="modal-form-submit">
            <button type="submit">Submit</button>
          </div>
        </form>`;

  document.body.insertAdjacentHTML("afterbegin", formhtml);
});
