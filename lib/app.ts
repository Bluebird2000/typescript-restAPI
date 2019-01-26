import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import indexRoutes from './routes/indexRoute';
import userRoutes from './routes/userRoute';
import * as dotenv from 'dotenv';
dotenv.config();
class App {
    public app: express.Application;
    public mongoUrl: string = 'mongodb://localhost:27017/tscapi';
    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
        this.apiRoutes();
    }
    private config(): void {
        //Support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        (<any>mongoose.Promise) = global.Promise;
        mongoose.connect(this.mongoUrl);
    }
    private apiRoutes(): void {
        this.app.use('/api/v1', indexRoutes);
        this.app.use('/api/v1/', userRoutes);
    }
}
export default new App().app;