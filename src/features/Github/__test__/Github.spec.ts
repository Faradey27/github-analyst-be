import GithubDriver from './Github.driver';
import * as mockedRepos from './mockedRepos.json';

describe('Github', () => {
  let driver: GithubDriver = null;

  beforeEach(async () => {
    driver = new GithubDriver();
    driver.mockAxios();
  });

  afterEach(() => {
    driver.cleanup();
  })

  describe('Github', () => {
    it('should be ok', async () => {
      expect(await driver.is.ok()).toBeTruthy();
    });

    it('should return list of ogranisation repos, first page 100 items', async () => {
      driver.when.githuApiRepos('orgs', 'wix', '1', '100', mockedRepos);
      const response = await driver.api.get('/api/v1/github/orgs/wix/repos?page=1&per_page=100');
      expect(response.body.repos.length).toBe(100);
      expect(response.body.repos[0]).toEqual({
        "id":1190268,
        "name":"souschef",
        "private":false,
        "starsCount":2,
        "watchersCount":2,
        "forksCount":0,
        "issuesCount":1,
        "language":"Ruby",
        "license":null,
        "permissions":{"admin":false,"push":false,"pull":true}
      });
    });

    it('should return list of ogranisation repos, first page 50 items', async () => {
      driver.when.githuApiRepos('orgs', 'wix', '1', '50', mockedRepos.slice(50));
      const response = await driver.api.get('/api/v1/github/orgs/wix/repos?page=1&per_page=50');
      expect(response.body.repos.length).toBe(50);
      expect(response.body.repos[0]).toEqual({
        "id": 15870633,
        "name": "swagger-ui",
        "private": false,
        "starsCount": 0,
        "watchersCount": 0,
        "forksCount": 2,
        "issuesCount": 1,
        "language": "JavaScript",
        "license": null,
        "permissions": {
          "admin": false, "push": false, "pull": true
        }
      });
    });
  })
})
