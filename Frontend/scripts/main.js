pendingNumber = 0;
processingNumber = 0;
completedNumber = 0;
totalNumber = 0;

// Retrieve user information from local storage
var username = localStorage.getItem("username");
var email = localStorage.getItem("email");
var userType = localStorage.getItem("usertype");

// Display user information in the personal info section
document.getElementById("userName").textContent = username;
document.getElementById("userEmail").textContent = email;
document.getElementById("userType").textContent = userType;

// Add event listener to the logout button
document.getElementById("logoutButton").addEventListener("click", function () {
  // Clear user information from local storage
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("userType");
  // Redirect to the login page
  window.location.href = "login.html";
});

async function populatePendingTable() {
  try {
    // Assuming you have access to the user ID in your frontend code
    const userId = localStorage.getItem("id"); // Replace getUserId() with your actual function to get the user ID
    console.log("User ID:", userId);

    const response = await fetch("http://localhost:3000/fetchDataPending", {
      method: "POST", // Use POST method to send data in the request body
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }), // Include the user ID in the request body
    });

    const data = await response.json();
    const table = document
      .getElementById("pendingTable")
      .getElementsByTagName("tbody")[0];

    data.forEach((element) => {
      const row = table.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);
      const cell6 = row.insertCell(5);
      cell1.textContent = element.id;
      cell2.textContent = element.department;
      cell3.textContent = element.description;
      cell4.textContent = element.queryType;
      cell5.textContent = element.contactNo;
      cell6.textContent = element.priority;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  pendingNumber = document.getElementById("pendingTable").rows.length - 1;
  document.querySelector(".js-pending-number").textContent = pendingNumber;
}

async function populateProcessingTable() {
  try {
    const response = await fetch("http://localhost:3000/fetchDataProcessing");
    const data = await response.json();
    const table = document
      .getElementById("processingTable")
      .getElementsByTagName("tbody")[0];

    data.forEach((element) => {
      const row = table.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);
      const cell6 = row.insertCell(5);
      cell1.textContent = element.id;
      cell2.textContent = element.department;
      cell3.textContent = element.description;
      cell4.textContent = element.queryType;
      cell5.textContent = element.contactNo;
      cell6.textContent = element.priority;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  processingNumber = document.getElementById("processingTable").rows.length - 1;
  document.querySelector(".js-processing-number").textContent =
    processingNumber;
}
async function populateCompletedTable() {
  try {
    const response = await fetch("http://localhost:3000/fetchDataCompleted");
    const data = await response.json();
    const table = document
      .getElementById("completedTable")
      .getElementsByTagName("tbody")[0];

    data.forEach((element) => {
      const row = table.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);
      const cell6 = row.insertCell(5);
      cell1.textContent = element.id;
      cell2.textContent = element.department;
      cell3.textContent = element.description;
      cell4.textContent = element.queryType;
      cell5.textContent = element.contactNo;
      cell6.textContent = element.priority;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  completedNumber = document.getElementById("completedTable").rows.length - 1;
  totalNumber = pendingNumber + processingNumber + completedNumber;
  document.querySelector(".js-completed-number").textContent = completedNumber;
  document.querySelector(".js-total-number").textContent = totalNumber;
}
window.onload = function () {
  populatePendingTable();
  populateProcessingTable();
  populateCompletedTable();
};
