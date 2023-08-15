import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import routes from './app/routes';
const app: Application = express();

app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/', routes);

// testing
app.get('/', async (req: Request, res: Response) => {
  // throw new ApiError(400, 'there is an error')
  // next('there is an error from next function')
  // Promise.reject(new Error('Unhandled Promise Rejection'))
  // console.log(x)
  res.send('server is running');
});

// global error handler
app.use(globalErrorHandler);

export default app;
