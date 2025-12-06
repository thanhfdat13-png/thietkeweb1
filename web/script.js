// ==== 1. Khởi tạo danh sách món ăn đặc sản vào localStorage (nếu chưa có) ====
const defaultProducts = [
  {
    id: 1,
    name: "Bún bò Huế",
    region: "Miền Trung",
    desc: "Sợi bún to, nước dùng đậm đà, đặc trưng xứ Huế.",
    img: "https://cdn.mediamart.vn/images/news/hc-cach-nu-bun-bo-hu-thom-ngon-dung-chun-huong-v_519e659c.jpg"
  },
  {
    id: 2,
    name: "Cơm tấm Sài Gòn",
    region: "Miền Nam",
    desc: "Sườn, bì, chả, mỡ hành thơm lừng.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROC7PVtIOtTihOaYgqnlM52808MqprVwORng&s"
  },
  {
    id: 3,
    name: "Phở bò Hà Nội",
    region: "Miền Bắc",
    desc: "Nước dùng trong, thơm, ngọt xương.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUOMgyx2ev7jcp6HeuEm8J-y5dKlDWK-_vAw&s"
  },
  {
    id: 4,
    name: "Bánh xèo miền Tây",
    region: "Miền Nam",
    desc: "Vỏ giòn, nhân tôm thịt, ăn kèm rau sống.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFzjUErarKZNJ1vObmCeHY1c1_EWHXFY881A&s"
  },
  {
    id: 5,
    name: "Bánh cuốn Thanh Trì",
    region: "Miền Bắc",
    desc: "Bánh mỏng, mềm, ăn kèm chả và nước chấm.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe7DubuptTDOPKLsX7Rvw2OqfrfDP5MNuatA&s"
  }
];

function initProducts() {
  localStorage.setItem("products", JSON.stringify(defaultProducts));
  
}

// ==== 2. Hiển thị sản phẩm trên trang products.html ====
function renderProducts(filterRegion = "all") {
  const container = document.getElementById("product-list");
  if (!container) return;

  const data = JSON.parse(localStorage.getItem("products")) || [];
  container.innerHTML = "";

  const filtered = filterRegion === "all"
    ? data
    : data.filter((p) => p.region === filterRegion);

  filtered.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-region">${p.region}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-actions">
          <span>Đặc sản</span>
          <button class="favorite-btn" data-id="${p.id}">♡</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Tương tác favorite
  const favBtns = document.querySelectorAll(".favorite-btn");
  favBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      btn.textContent = btn.classList.contains("active") ? "♥" : "♡";
    });
  });
}

// ==== 3. Tabs cho auth.html (đăng ký / đăng nhập / đổi mật khẩu / góp ý) ====
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  if (!tabButtons.length) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;

      tabButtons.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });
}

// ==== 4. localStorage users: đăng ký, đăng nhập, đổi mật khẩu ====
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function initAuthForms() {
  // Đăng ký
  const regForm = document.getElementById("registerForm");
  if (regForm) {
    regForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("reg-username").value.trim();
      const password = document.getElementById("reg-password").value;

      const users = getUsers();
      if (!username || !password) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
      }
      if (users.find((u) => u.username === username)) {
        alert("Tên đăng nhập đã tồn tại.");
        return;
      }
      users.push({ username, password });
      saveUsers(users);
      alert("Đăng ký thành công!");
    });
  }

  // Đăng nhập
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value;
      const users = getUsers();

      const found = users.find(
        (u) => u.username === username && u.password === password
      );
      if (found) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("currentUser", username);
        window.location.href = "index.html";
      } else {
        alert("Sai tên đăng nhập hoặc mật khẩu.");
      }
    });
  }

  // Đổi mật khẩu
  const changeForm = document.getElementById("changeForm");
  if (changeForm) {
    changeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("change-username").value.trim();
      const oldPass = document.getElementById("old-password").value;
      const newPass = document.getElementById("new-password").value;

      const users = getUsers();
      const index = users.findIndex(
        (u) => u.username === username && u.password === oldPass
      );
      if (index === -1) {
        alert("Sai tên đăng nhập hoặc mật khẩu cũ.");
        return;
      }
      users[index].password = newPass;
      saveUsers(users);
      alert("Đổi mật khẩu thành công!");
    });
  }

  // Góp ý
  const feedbackForm = document.getElementById("feedbackForm");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("fb-name").value.trim();
      const msg = document.getElementById("fb-message").value.trim();
      if (!name || !msg) {
        alert("Vui lòng nhập tên và nội dung góp ý.");
        return;
      }
      alert("Cảm ơn bạn đã góp ý! (Demo: dữ liệu chưa gửi lên server)");
      feedbackForm.reset();
    });
  }
}

// ==== 5. Khởi động khi load trang ====
document.addEventListener("DOMContentLoaded", () => {
  initProducts();
  initTabs();
  initAuthForms();

  // Render sản phẩm nếu đang ở trang products
  const filterSelect = document.getElementById("region-filter");
  if (filterSelect) {
    renderProducts("all");
    filterSelect.addEventListener("change", () => {
      renderProducts(filterSelect.value);
    });
  }
});
