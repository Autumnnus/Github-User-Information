const githubForm = document.querySelector("#github-form");
const nameInput = document.querySelector("#githubname");
const clearLastUsers = document.querySelector("#clear-last-users");
const lastUsers = document.querySelector("#last-users");

const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners() {
  githubForm.addEventListener("submit", getData);
  clearLastUsers.addEventListener("click", clearAllSearched);
  document.addEventListener("DOMContentLoaded", getAllSearched);
}

function getData(e) {
  let username = nameInput.value.trim();

  if (username === "") {
    ui.showError("Enter a username to begin");
  } else {
    // Show loading state
    document.querySelector("#status-indicator").innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Exploring...';

    github
      .getGithubData(username)
      .then((response) => {
        if (response.error || response.user.message === "Not Found") {
          ui.showError(response.message || "User not found");
        } else {
          // Update UI
          ui.showUserInfo(response.user, response.langStats);
          ui.showRepoInfo(response.repo);

          // Storage & History
          Storage.addSearchedUserToStorage(username);
          updateHistoryUI();

          // Reset Status
          document.querySelector("#status-indicator").innerHTML =
            '<i class="fa-solid fa-circle-nodes"></i> Discovery Complete';
        }
      })
      .catch((err) => {
        console.error(err);
        ui.showError("Connection failed");
      });
  }
  ui.clearInput();
  e.preventDefault();
}

function clearAllSearched() {
  if (confirm("Reset discovery history?")) {
    Storage.clearAllSearchedUsersFromStorage();
    updateHistoryUI();
  }
}

function updateHistoryUI() {
  let users = Storage.getSearchedUsersFromStorage();
  let result = "";

  users
    .slice()
    .reverse()
    .forEach((user) => {
      result += `
            <li class="history-item" onclick="quickSearch('${user}')">
                <div class="history-avatar"><i class="fa-solid fa-user" style="font-size: 0.8rem; color: var(--text-muted)"></i></div>
                <div style="flex:1">
                    <div style="font-size: 0.9rem; font-weight: 500">${user}</div>
                </div>
                <i class="fa-solid fa-chevron-right" style="font-size: 0.6rem; color: var(--text-muted)"></i>
            </li>
        `;
    });

  lastUsers.innerHTML =
    result ||
    '<div style="padding:1rem; text-align:center; color:var(--text-muted); font-size:0.8rem">No recent discoveries</div>';
}

function getAllSearched() {
  updateHistoryUI();
}

// Global helper for history clicks
window.quickSearch = function (username) {
  nameInput.value = username;
  githubForm.dispatchEvent(new Event("submit"));
  document.getElementById("history-panel").style.display = "none";
};
