import * as bcrypt from 'bcrypt';
import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/user';
class UserRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    public getUsers(req: Request, res: Response) {
        User.find({}).then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        }).catch((error) => {
            const status = res.statusCode;
            res.json({
                status,
                error
            });
        })
    }
    public createUser(req: Request, res: Response): void {
        User.find({ email: req.body.email }).exec().then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    status: 409,
                    message: "Mail exists"
                });
            } else {
                // Using Object Destructuring
                // const { firstname, lastname, email, password, created_at, updated_at } = req.body;
                // const encryptedPassword = bcrypt.hash(req.body.password, 10);
                const user = new User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password,
                    // firstname, lastname, email, encryptedPassword, created_at, updated_at
                });
                user.save().then(data => {
                    res.status(201).json({
                        status: 201,
                        message: "Account successfully created",
                        data,
                    });
                }).catch(err => {
                    res.status(500).json({
                        status: 500,
                        error: err
                    });
                });
            }
        });
    }

    public routes() {
        this.router.get('/', this.getUsers);
        this.router.post('/', this.createUser);

    }
}

const userRoutes = new UserRouter();
userRoutes.routes();

//export User route handler
export default userRoutes.router;