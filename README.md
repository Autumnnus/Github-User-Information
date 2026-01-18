# 🔭 GitLens | Advanced GitHub Explorer

GitLens is a high-end, minimalist GitHub profile exploration tool. It moves beyond simple user searches by providing deep insights into a developer's technology stack, repository impact, and historical activity through a sophisticated, human-centric interface.

![GitLens Preview](ss.png)

## ✨ Premium Features

- **Profile Deep Dive:** Explore rich metadata including bio, location, company, gists, and account age.
- **Stack Visualization:** Automatically calculates and visualizes a user's top 5 programming languages based on their recent repository activity.
- **Intelligent Repo Sorting:** Repositories are ranked by an "Impact Score" (Stars + Forks) to highlight a user's most successful projects first.
- **Discovery History:** A persistent, floating history panel (FAB) that allows for one-tap re-discovery of previously searched developers.
- **Modern Bento UI:** A sleek, dark-mode interface inspired by bento-grid layouts, featuring glassmorphism and smooth staggered animations.
- **Tech Forward Typography:** Utilizes premium typefaces (Outfit & Plus Jakarta Sans) for a professional digital product feel.

## 🛠️ Built With

- **HTML5 & Vanilla CSS3:** Utilizing CSS Grid, Flexbox, and backdrop-filter for a custom design without heavy frameworks.
- **Modern JavaScript (ES6+):** Object-oriented approach with separate classes for UI, GitHub API, and Storage logic.
- **GitHub REST API:** Real-time data fetching with optimized queries for updated repositories.
- **Font Awesome:** For crisp, meaningful iconography.

## 🚀 Getting Started

1. **Clone the repository:**
2. **Open index.html:**
   Simply open the `index.html` file in your preferred modern browser.
3. **Explore:**
   Type any GitHub username (e.g., `kdr-oz` or `octocat`) into the search bar and press enter to start your discovery.

## 📐 Architecture (Clean Code)

The project follows SOLID principles with a clear separation of concerns:

- `github.js`: Handles all asynchronous communication with the GitHub API.
- `ui.js`: Manages the dynamic rendering of profiles, repos, and stack charts.
- `storage.js`: Encapsulates local environment persistence for search history.
- `script.js`: Orchestrates event listeners and application state.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

_Crafted with passion for the open-source community._
