document
  .getElementById("toggle-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    var loginForm = document.getElementById("login-form");
    var signupForm = document.getElementById("signup-form");
    var formTitle = document.getElementById("form-title");

    if (loginForm.style.display === "none") {
      loginForm.style.display = "block";
      signupForm.style.display = "none";
      formTitle.innerText = "Login";
      event.target.innerText = "Don't have an account? Sign Up";
    } else {
      loginForm.style.display = "none";
      signupForm.style.display = "block";
      formTitle.innerText = "Sign Up";
      event.target.innerText = "Already have an account? Login";
    }
  });

// Add event listener to the login form
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Log the username to the console
  console.log("Username:", username);
  console.log("Password:", password);

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json().catch((err) => {
    console.error("Failed to parse JSON:", err);
    return { message: "Login failed" };
  });

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("email", data.user.email);
    localStorage.setItem("usertype", data.user.usertype);
    localStorage.setItem("id", data.user.id);
    // Redirect to main.html
    window.location.href = "main.html";
  } else {
    console.log("Login failed");
    alert("Login failed");
  }
});

// Add event listener to the signup form
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("new_username").value;
  const password = document.getElementById("new_password").value;
  const email = document.getElementById("email").value;
  const usertype = document.getElementById("user_type").value;

  // Log the new user information to the console
  console.log("New Username:", username);
  console.log("New Password:", password);
  console.log("Email:", email);
  console.log("User Type:", usertype);

  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, usertype, email }),
  });

  const data = await response.json();
  console.log(data.message);
  alert(data.message);

  // Redirect to login.html after signup
  window.location.href = "login.html";
});
