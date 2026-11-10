const repositoryList = document.querySelector("#repository-list");
const repositoryStatus = document.querySelector("#repository-status");

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list.");
    }

    for (const repository of repositories) {
      const item = document.createElement("li");
      item.className = "repository-card";

      const link = document.createElement("a");
      link.href = repository.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = repository.name;

      const description = document.createElement("p");
      description.textContent = repository.description;

      item.append(link, description);
      repositoryList.append(item);
    }

    repositoryStatus.textContent = repositories.length
      ? ""
      : "No starred repositories yet.";
  } catch (error) {
    console.error("Could not load starred repositories:", error);
    repositoryStatus.textContent =
      "Could not load repositories. Please try again later.";
  }
}

loadRepositories();
