class Github {
  constructor() {
    this.url = "https://api.github.com/users/";
  }

  async getGithubData(username) {
    try {
      // Get user basic info
      const responseUser = await fetch(this.url + username);
      if (!responseUser.ok) throw new Error("User not found");
      const userData = await responseUser.json();

      // Get user repos
      const responseRepos = await fetch(
        `${this.url}${username}/repos?per_page=100&sort=pushed`,
      );
      const repoData = await responseRepos.json();

      // Calculate language distribution for top repos
      const languages = {};
      repoData.slice(0, 20).forEach((repo) => {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      });

      return {
        user: userData,
        repo: repoData,
        langStats: languages,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }
}
