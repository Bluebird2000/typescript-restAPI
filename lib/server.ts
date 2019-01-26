import * as dotenv from 'dotenv';
import app from './app';
dotenv.config();
app.listen(process.env.PORT, () => {
    console.log(`Application now listening on port ${process.env.PORT}`);
});
export default app;