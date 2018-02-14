import { Application, Request, Response } from 'express';
import { IFeature } from './../../@types/features.d';
import { fetchRepos } from './services/gitApi';
import { mapRepo } from './services/mappers';

class Github implements IFeature {
  private static PREFIX = '/api/v1/github';
  private expressApp: Application;

  constructor(app: Application) {
    this.expressApp = app;
  }

  public featureName: string = 'github';

  public connect = () => {
    this.setupRouting(this.expressApp);
    return Promise.resolve({ status: 'OK' });
  }

  private setupRouting(router: Application) {
    const prefix = Github.PREFIX;

    router.get(`${prefix}/status`, this.status);
    router.get(`${prefix}/:type/:name/repos`, this.getRepos);
  }

  private status = (req: Request, res: Response) => {
    return res.status(200).json({ status: 'OK' });
  }

  private getRepos = async (req: Request, res: Response) => {
    const { type, name } = req.params;
    const { page, per_page } = req.query;

    const rawRepos: any = await fetchRepos({type, name, page, per_page});

    return res.status(200).json({ repos: rawRepos.map(mapRepo) });
  }
}

export default Github;
