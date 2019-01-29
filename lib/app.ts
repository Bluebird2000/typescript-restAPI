
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';
import UserRouter from './routes/userRoute';

//creating the server class
class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.middleware();
        this.routes();
    }

    private config() {
        const MONGO_URI = 'mongodb://localhost:27017/tssandbox';
        mongoose.connect(MONGO_URI || process.env.DATABSE_URL, { useMongoClient: true }, (err) => {
            if (err) {
                return console.log('unable to establish database connection', err);
            }
            console.log('connection successful');
        });
    }
    private middleware() {
        // Set up middleware configuration
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }
    public routes(): void {
        let router: express.Router;
        router = express.Router();
        this.app.use('/', router);
        this.app.use('/api/v1/users', UserRouter);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
}

// export server connection
export default new Server().app;
