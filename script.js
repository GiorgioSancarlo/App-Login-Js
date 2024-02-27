document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  const logoutButton = document.getElementById("logoutButton");
  loginButton.addEventListener("click", login);
  logoutButton.addEventListener("click", logout);
  showPage(getCurrentPage());
  if (getCurrentPage() === "userList") {
    showUserList();
  }
  function login() {
    const username = document.getElementById("username").value.trim();
    if (username === "") {
      alert("Inserisci un username valido.");
      return;
    }
    const userList = getUserList();
    const existingUser = userList.find((user) => user.username === username);
    if (existingUser) {
      existingUser.count++;
      existingUser.lastLogin = new Date().toLocaleString();
    } else {
      userList.push({
        username: username,
        count: 1,
        lastLogin: new Date().toLocaleString(),
      });
    }
    localStorage.setItem("userList", JSON.stringify(userList));
    showPage("userList");
    showUserList();
  }

  function logout() {
    document.getElementById("username").value = "";
    showPage("loginPage");
  }

  function showPage(pageId) {
    const pages = document.querySelectorAll(".container");
    pages.forEach((page) => {
      if (page.id === pageId) {
        page.style.display = "block";
      } else {
        page.style.display = "none";
      }
    });
    setCurrentPage(pageId);
  }

  function getUserList() {
    return JSON.parse(localStorage.getItem("userList")) || [];
  }

  function showUserList() {
    const userList = getUserList();
    const listElement = document.getElementById("list");
    listElement.innerHTML = "";
    userList.forEach((user) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Username: ${user.username} | Logins: ${user.count} | Last Login: ${user.lastLogin}`;
      listElement.appendChild(listItem);
    });
  }

  function getCurrentPage() {
    return localStorage.getItem("currentPage") || "loginPage";
  }

  function setCurrentPage(pageId) {
    localStorage.setItem("currentPage", pageId);
  }
});
