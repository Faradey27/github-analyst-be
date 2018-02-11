import { Application, Request, Response } from 'express';
import { IFeature } from './../../@types/features.d';

class Github implements IFeature {
  private static PREFIX = '/api/v1/github';
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public featureName: string = 'github';

  public connect = () => {
    this.setupRouting(this.app);
    return Promise.resolve({ status: 'OK' });
  }

  private setupRouting(router: Application) {
    const prefix = Github.PREFIX;

    router.get(`${prefix}/status`, this.status);
  }

  private status = (req: Request, res: Response) => {
    return res.status(200).json({ status: 'OK' });
  }
}

export default Github;
