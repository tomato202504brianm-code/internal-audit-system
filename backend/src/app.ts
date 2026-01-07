import authRoutes from './auth/auth.routes';

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/health', (_req: any, res: any) => {
  res.json({ status: 'ok' });
});

export default app;
