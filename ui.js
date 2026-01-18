class UI {
  constructor() {
    this.mainContent = document.querySelector("#main-content");
    this.lastUsers = document.querySelector("#last-users");
    this.inputArea = document.querySelector("#githubname");

    this.langColors = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      Python: "#3572A5",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Java: "#b07219",
      PHP: "#4F5D95",
      Ruby: "#701516",
      Go: "#00ADD8",
      Rust: "#dea584",
      C: "#555555",
      "C++": "#f34b7d",
      Swift: "#F05138",
    };
  }

  clearInput() {
    this.inputArea.value = "";
  }

  showUserInfo(user, langStats) {
    // Calculate Total languages for bar
    const totalLangs = Object.values(langStats).reduce((a, b) => a + b, 0);
    let langBarHTML = "";
    let langLabelsHTML = "";

    Object.entries(langStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .forEach(([lang, count]) => {
        const percent = ((count / totalLangs) * 100).toFixed(1);
        const color = this.langColors[lang] || "#888";
        langBarHTML += `<div class="lang-segment" style="width: ${percent}%; background: ${color}"></div>`;
        langLabelsHTML += `
                    <div class="lang-label">
                        <span class="lang-dot" style="background: ${color}"></span>
                        <span>${lang} <b>${percent}%</b></span>
                    </div>
                `;
      });

    this.mainContent.innerHTML = `
            <aside class="profile-card reveal">
                <div class="avatar-ring">
                    <img class="avatar" src="${user.avatar_url}" alt="${user.login}">
                </div>
                <h2>${user.name || user.login}</h2>
                <span class="username">@${user.login}</span>
                <p class="profile-bio">${user.bio || "Crafting code in the shadows of the internet."}</p>
                
                <div class="profile-stats-mini">
                    <div class="mini-stat">
                        <span class="value">${this.formatCount(user.followers)}</span>
                        <span class="label">Followers</span>
                    </div>
                    <div class="mini-stat">
                        <span class="value">${this.formatCount(user.public_repos)}</span>
                        <span class="label">Repos</span>
                    </div>
                    <div class="mini-stat">
                        <span class="value">${this.formatCount(user.public_gists)}</span>
                        <span class="label">Gists</span>
                    </div>
                </div>

                <ul class="profile-links">
                    <li class="profile-link"><i class="fa-solid fa-calendar-alt"></i> Joined ${new Date(user.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</li>
                    <li class="profile-link"><i class="fa-solid fa-location-dot"></i> ${user.location || "Unknown"}</li>
                    <li class="profile-link"><i class="fa-solid fa-building"></i> ${user.company || "Independent"}</li>
                    <li class="profile-link"><i class="fa-solid fa-link"></i> ${user.blog ? `<a href="${user.blog.startsWith("http") ? user.blog : "https://" + user.blog}" target="_blank" style="color:inherit">Portfolio</a>` : "No website"}</li>
                </ul>
            </aside>

            <section class="content-area reveal" style="animation-delay: 0.1s">
                <h3>Current Stack <span><i class="fa-solid fa-chart-pie" style="font-size: 1rem; color: var(--primary)"></i></span></h3>
                <div class="languages-bar">${langBarHTML}</div>
                <div class="lang-labels">${langLabelsHTML}</div>

                <h3>Featured Repositories</h3>
                <div class="repos-grid" id="repos">
                    <!-- Repos content -->
                </div>
            </section>
        `;
  }

  showRepoInfo(repos) {
    const repoList = document.querySelector("#repos");
    repoList.innerHTML = "";

    // Filter and Sort: Take top 6 by stars, or most recently updated
    const displayedRepos = repos
      .sort(
        (a, b) =>
          b.stargazers_count +
          b.forks_count -
          (a.stargazers_count + a.forks_count),
      )
      .slice(0, 10);

    displayedRepos.forEach((repo) => {
      const color = this.langColors[repo.language] || "#888";
      repoList.innerHTML += `
                <div class="repo-card reveal" style="animation-delay: 0.2s">
                    <span class="repo-type">${repo.private ? "Private" : "Public"}</span>
                    <a href="${repo.html_url}" target="_blank" class="repo-title">${repo.name}</a>
                    <p class="repo-desc">${repo.description || "Experimental exploration of code and concepts."}</p>
                    <div class="repo-meta">
                        <span><i class="fa-solid fa-circle" style="color:${color}; font-size:6px"></i> ${repo.language || "Plain"}</span>
                        <span><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>
                        <span><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
                    </div>
                </div>
            `;
    });
  }

  formatCount(num) {
    return num > 999 ? (num / 1000).toFixed(1) + "k" : num;
  }

  showError(message) {
    const status = document.querySelector("#status-indicator");
    const originalText = status.innerHTML;
    status.innerHTML = `<span style="color:var(--danger)"><i class="fa-solid fa-circle-exclamation"></i> ${message}</span>`;
    setTimeout(() => (status.innerHTML = originalText), 3000);
  }

  addSearchedUserToUI(username) {
    // We'll manage history updates in script.js but this can refresh the list
  }

  clearAllSearchedFromUI() {
    this.lastUsers.innerHTML = "";
  }
}
