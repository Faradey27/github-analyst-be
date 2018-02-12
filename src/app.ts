import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as expressStatusMonitor from 'express-status-monitor';
import * as path from 'path';
import { IFeature } from './@types/features.d';

interface IFeatureMap {
  [key: string]: IFeature
}

class App {
  private expressApp: express.Application;
  private server: any;
  private features: IFeatureMap = {};

  constructor() {
    /* here we loading our env variables, like MONGO_URL, API_KEY, etc.*/
    dotenv.config({ path: path.join(__dirname, './../.env.example') });

    this.expressApp = express();
    this
      .setPort()
      .setMiddlewares();
  }

  public getExpressApp = (): express.Application => this.expressApp;

  public setPort = (): App => {
    this.expressApp.set('port', process.env.PORT || '3000');

    return this;
  }

  public setMiddlewares = (): App => {
    /*
      expressStatusMonitor(https://github.com/RafalWilinski/express-status-monitor)
      nice tool for monitoring memory usage, response time, etc.
    */
    this.expressApp.use(expressStatusMonitor());
    /*
      compression(https://github.com/expressjs/compression)
      we wanna gzip everything that we sending to the client
    */
    this.expressApp.use(compression());
    /*
      bodyParser(https://github.com/expressjs/body-parser)
      we wanna have json in req.body instead of string
    */
    this.expressApp.use(bodyParser.json());
    /*
      express.static
      here we define folder which we gonna server, so if we will put image in /public folder, we could get it as /imageName.png
    */
    this.expressApp.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

    return this;
  }

  /*
    this function should be used to add new feature to project,
    each feature is small independent sub-application
  */
  public addFeature(feature: any): Promise<any> {
    const instanceOfFeature: IFeature = new feature(this.expressApp);
    this.features[instanceOfFeature.featureName] = instanceOfFeature;

    return instanceOfFeature.connect();
  }

  public getFeatures = (): IFeatureMap => this.features;

  /* here we just starting express server and log info about that */
  public start = (): Promise<any> => {
    return new Promise((resolve) => {
      // we wanna save link to started server
      this.server = this.expressApp.listen(this.expressApp.get('port'), () => {
        console.info(
          ('App is running at http://localhost:%d in %s mode'),
          this.expressApp.get('port'),
          this.expressApp.get('env'),
        );
        console.info('Press CTRL-C to stop\n');

        resolve({status: 'OK'});
      });
    });
  }

  /* we stoping express server and log info about this */
  public stop = (): Promise<any> => {
    this.server.close();
    console.info('Server stopped');
    return Promise.resolve({status: 'OK'});
  }
}

const appSingleton = new App();

export default appSingleton;
