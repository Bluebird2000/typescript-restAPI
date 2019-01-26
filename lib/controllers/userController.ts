import * as mongoose from 'mongoose';
// import * as bcrypt from 'bcrypt';
// import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { UserSchema } from '../models/user';

const User = mongoose.model('User', UserSchema);

const UserController = {
    createUser(req: Request, res: Response) {
        User.find({ email: req.body.email })
            .exec()
            .then(user => {
                if (user.length >= 1) {
                    return res.status(409).json({
                        message: "Mail exists"
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        created_at: req.body.created_at,
                        updated_at: req.body.updated_at,
                    });
                    user
                        .save()
                        .then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: "Account successfully created"
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                }
            });
    }
}
export default UserController;