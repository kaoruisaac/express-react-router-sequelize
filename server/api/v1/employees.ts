import express from 'express';
import Employee from '../../db/models/Employee';

const router = express.Router();

// 創建員工
router.post('/create', async (req, res) => {
  try {
    const { name, email, roles, password } = req.body;

    // 驗證必填欄位
    if (!name || !password) {
      return res.status(400).json({
        success: false,
        message: '姓名和密碼為必填欄位'
      });
    }

    // 檢查 email 是否已存在
    if (email) {
      const existingEmployee = await Employee.findOne({ where: { email } });
      if (existingEmployee) {
        return res.status(400).json({
          success: false,
          message: '此 email 已被使用'
        });
      }
    }

    // 創建員工（密碼會自動被 bcrypt 加密）
    const employee = await Employee.create({
      name,
      email,
      roles: roles || [],
      password
    });

    // 回傳結果（不包含密碼）
    const employeeData = employee.toJSON();
    delete employeeData.password;

    res.status(201).json({
      success: true,
      message: '員工創建成功',
      data: employeeData
    });

  } catch (error) {
    console.error('創建員工時發生錯誤:', error);
    res.status(500).json({
      success: false,
      message: '創建員工時發生錯誤'
    });
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