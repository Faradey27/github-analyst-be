import GithubDriver from './Github.driver';

describe('Github', () => {
  let driver: GithubDriver = null;

  beforeEach(async () => {
    driver = new GithubDriver();
  });

  describe('Github', () => {
    it('should be ok', async () => {
      expect(await driver.is.ok()).toBeTruthy();
    });
  })
})
