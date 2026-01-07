const { Router } = require('express');

const router = Router();

router.get('/', (_req: any, res: any) => {
  res.json([
    { id: 1, user: 'admin01', action: 'LOGIN', timestamp: '2026-01-07T10:12:00' }
  ]);
});

export default router;
