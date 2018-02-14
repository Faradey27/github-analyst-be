interface IRepo {
  id: number;
  name: string;
  private: boolean;
  starsCount: number;
  watchersCount: number;
  forksCount: number;
  issuesCount: number;
  language: string;
  license: string;
  permissions: {
    admin: boolean;
    push: boolean;
    pull: boolean;
  }
}

export const mapRepo = (repo: any): IRepo => {
  return {
    id: repo.id,
    name: repo.name,
    private: repo.private,
    starsCount: repo.stargazers_count,
    watchersCount: repo.watchers_count,
    forksCount: repo.forks_count,
    issuesCount: repo.open_issues_count,
    language: repo.language,
    license: repo.license,
    permissions: repo.permissions
  };
}
