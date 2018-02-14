import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import * as supertest from 'supertest';
import app from './../../../app';
import Github from './../index';
import { API_LINK } from './../services/gitApi';

class GithubDriver {
  private request: supertest.SuperTest<supertest.Test>;
  private axiosMock: AxiosMockAdapter;

  constructor() {
    app.addFeature(Github);
    this.request = supertest(app.getExpressApp());
  }

  public mockAxios = () => {
    this.axiosMock = new AxiosMockAdapter(axios);
  }

  public api = {
    get: (path: string) => this.request.get(path)
  }

  public when = {
    githuApiRepos: (type: string, name: string, page: string, per_page: string, repos: any) => {
      this.axiosMock.onGet(`${API_LINK}/${type}/${name}/repos`, { params: {page, per_page} })
      .reply(200, repos);
      return this;
    }
  }

  public is = {
    ok: async () => {
      const response = await this.request.get('/api/v1/github/status');
      return response.body.status === 'OK' && response.status === 200;
    },
  };

  public cleanup = () => {
    this.axiosMock.restore();
    this.axiosMock.reset();
  }
}

export default GithubDriver;
