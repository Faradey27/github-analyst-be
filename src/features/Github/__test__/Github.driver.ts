import * as supertest from 'supertest';
import app from './../../../app';
import Github from './../index';

class GithubDriver {
  private request: supertest.SuperTest<supertest.Test>;

  constructor() {
    app.addFeature(Github);
    this.request = supertest(app.getExpressApp());
  }

  public is = {
    ok: async () => {
      const response = await this.request.get('/api/v1/github/status');
      return response.body.status === 'OK' && response.status === 200;
    },
  };
}

export default GithubDriver;
