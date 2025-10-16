import express from 'express';
import path from 'path';
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

// Serve healthcheck endpoint
app.get('/health', (_req, res) => {
  res.send('ok');
});

// Serve static files (frontend)
app.use(express.static('../frontend/dist'));
app.get(/.*/, (_req, res) => {
  res.sendFile(path.resolve('frontend/dist/index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
