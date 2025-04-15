// ======================
// 🟩 Highlight Active Nav Link
// ======================
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll("nav a").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPage || (href === "index.html" && currentPage === "")) {
    link.classList.add("active");
  }
});

// ======================
// 💌 Contact Form Validation
// ======================
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    const name = form.querySelector("input[type='text']");
    const email = form.querySelector("input[type='email']");
    const message = form.querySelector("textarea");

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      e.preventDefault();
      alert("Please fill in all fields.");
    } else {
      alert("Thanks for your message!");
    }
  });
}

// ======================
// 🎨 Theme Management
// ======================
const themeSelect = document.getElementById("theme-select");
const toggleBtn = document.getElementById("toggle-mode");

// 🧹 Remove all theme classes
function clearAllThemes() {
  document.body.classList.remove(
    "theme-light",
    "theme-dark",
    "theme-blue",
    "theme-teal",
    "theme-violet"
  );
}

// 🌈 Apply Theme
function setTheme(themeName) {
  document.body.className = "transition"; // optional smooth transition
  clearAllThemes();
  document.body.classList.add(`theme-${themeName}`);
  localStorage.setItem("theme", themeName);
  if (themeSelect) themeSelect.value = themeName;
}

// 🎯 Apply saved theme on load
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

// 🔁 Theme selector change event
if (themeSelect) {
  themeSelect.addEventListener("change", function () {
    setTheme(this.value);
  });
}

// 🌗 Dark mode toggle (fallback)
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("theme-dark");
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
  });
}

// ======================
// 🔐 Signup Button Redirect
// ======================
const signupBtn = document.getElementById("signup-btn");
if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    window.location.href = "signup.html";
  });
}

// ======================
// 📝 Signup Form Logic
// ======================
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    const userData = { name, email, password };
    localStorage.setItem("user", JSON.stringify(userData));
    alert("Signup successful!");
    window.location.href = "index.html";
  });

  const toggleBtn = document.getElementById("toggle-password");
  const passwordField = document.getElementById("password");

  toggleBtn.addEventListener("click", () => {
    const type = passwordField.getAttribute("type");
    passwordField.setAttribute("type", type === "password" ? "text" : "password");
    toggleBtn.textContent = type === "password" ? "🙈" : "👁️";
  });
}

// ======================
// 🔓 Login Form Logic
// ======================
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const storedData = JSON.parse(localStorage.getItem("user"));

    if (!storedData) {
      alert("No user found. Please sign up first.");
      return;
    }

    if (email === storedData.email && password === storedData.password) {
      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      alert("Invalid email or password.");
    }
  });

  const toggleLoginBtn = document.getElementById("toggle-login-password");
  const loginPasswordField = document.getElementById("login-password");

  toggleLoginBtn.addEventListener("click", () => {
    const type = loginPasswordField.getAttribute("type");
    loginPasswordField.setAttribute("type", type === "password" ? "text" : "password");
    toggleLoginBtn.textContent = type === "password" ? "🙈" : "👁️";
  });
}

// ======================
// 🔁 Manage Login Status on All Pages
// ======================
window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const loginLink = document.getElementById("nav-login");
  const signupLink = document.getElementById("nav-signup");
  const logoutLink = document.getElementById("nav-logout");
  const welcomeMsg = document.getElementById("welcome-message");

  if (user) {
    if (loginLink) loginLink.style.display = "none";
    if (signupLink) signupLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "inline";
    if (welcomeMsg) welcomeMsg.textContent = `Welcome, ${user.name}! 👋`;
  } else {
    if (loginLink) loginLink.style.display = "inline";
    if (signupLink) signupLink.style.display = "inline";
    if (logoutLink) logoutLink.style.display = "none";
    if (welcomeMsg) welcomeMsg.textContent = "";
  }

  if (logoutLink) {
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("user");
      alert("Logged out successfully.");
      window.location.href = "index.html";
    });
  }
});
