document
  .getElementById("queryForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const data = {
      department: document.getElementById("department").value,
      description: document.getElementById("description").value,
      queryType: document.getElementById("queryType").value,
      contactNo: document.getElementById("contactNo").value,
      priority: document.querySelector('input[name="priority"]:checked').value,
      user_id: localStorage.getItem("id"),
    };

    fetch("http://localhost:3000/submit-query", {
      // Pointing to the correct URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        alert("Query submitted successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // Redirect to main.html
    window.location.href = "main.html";
  });
