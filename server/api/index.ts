import express from 'express';
import v1 from './v1';
import auth from './auth';

const router = express.Router();

router.use('/v1', v1);
router.use('/auth', auth);

export default router;