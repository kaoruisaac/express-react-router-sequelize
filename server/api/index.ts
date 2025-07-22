import express from 'express';
import employeeRoutes from './v1/employees';

const router = express.Router();

// Employee 路由
router.use('/v1/employees', employeeRoutes);

export default router;
