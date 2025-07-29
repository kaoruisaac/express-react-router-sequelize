import express from 'express';
import employeeRoutes from './employee';
import { apiValidEmployee } from 'server/middlewares/auth';

const router = express.Router();

// Employee 路由
router.use('/employee', apiValidEmployee(), employeeRoutes);

export default router;
