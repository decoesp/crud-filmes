import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { errorHandler } from './middlewares/error-handler';
import { startCronJobs } from './jobs/reminder-job';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  startCronJobs();
  console.log('⏰ Cron jobs started');
});
