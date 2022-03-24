import express from 'express';
import * as bodyParser from 'body-parser';
import { controllersHandler } from './common/controllers.handler';

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;

    this.initMiddlewares();
    this.initControllers(controllers);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initControllers(controllers: any) {
    controllersHandler(controllers, this.app);
  }
}

export default App;
