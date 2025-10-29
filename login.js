
const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");


const USERNAME = "Maksum";
const PASSWORD = "11012004";

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === USERNAME && password === PASSWORD) {
    
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "kasir.html"; 
  } else {
    errorMsg.textContent = "Username atau password salah!";
  }
});
