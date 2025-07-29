import express from 'express';
import validator from 'shared/validator';
import Employee from '../../db/models/Employee';
import RequestError, { ReasonPhrases, StatusCodes } from 'shared/RequestError';

const router = express.Router();

// 創建員工
router.post('/create', async (req, res, next) => {
  try {
    const { name, email, roles, password } = req.body;

    // 驗證必填欄位
    validator.employee.create.validateSync(req.body, { abortEarly: false });

    // 檢查 email 是否已存在
    if (email) {
      const existingEmployee = await Employee.findOne({ where: { email } });
      if (existingEmployee) {
        throw new RequestError({
          errorMessage: '此 email 已被使用',
          status: StatusCodes.BAD_REQUEST,
        });
      }
    }

    // 創建員工（密碼會自動被 bcrypt 加密）
    await Employee.create({
      name,
      email,
      roles: roles || [],
      password
    });

    res.status(201).send(ReasonPhrases.CREATED);

  } catch (error) {
    next(error);
  }
});

// 獲取所有員工
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: { exclude: ['password'] } // 排除密碼欄位
    });

    res.json({
      success: true,
      data: employees
    });

  } catch (error) {
    console.error('獲取員工列表時發生錯誤:', error);
    res.status(500).json({
      success: false,
      message: '獲取員工列表時發生錯誤'
    });
  }
});

// 根據 ID 獲取員工
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: '找不到該員工'
      });
    }

    res.json({
      success: true,
      data: employee
    });

  } catch (error) {
    console.error('獲取員工時發生錯誤:', error);
    res.status(500).json({
      success: false,
      message: '獲取員工時發生錯誤'
    });
  }
});

export default router; 