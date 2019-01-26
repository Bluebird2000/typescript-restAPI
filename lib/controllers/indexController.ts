import { Request, Response } from 'express';
const indexController = {
    welcome(req: Request, res: Response) {
        res.status(200)
            .send({
                message: "welcome to the world of digital possibilities"
            });
    }
}
export default indexController;
