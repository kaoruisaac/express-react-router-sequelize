import express from 'express';
import user from './user';
import panel from './panel';

const router = express.Router();

router.use('/user', user);
router.use('/panel', panel);

export default router;