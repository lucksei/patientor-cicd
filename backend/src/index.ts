import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRotuer from './routes/patients';
import { errorMiddleware } from './middlewares';

const app = express();

app.use(express.json());

// Routes
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRotuer);
app.get('/api/ping', (_req, res) => {
  console.log('someone has pinged here');
  res.send('pong');
});

app.use(errorMiddleware);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
