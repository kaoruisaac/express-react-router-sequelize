import Employee from "server/db/models/Employee";
import { clearEmployeeCookie, wrapEmployeeIntoCookie } from "server/services/authToken";
import RequestError, { StatusCodes, ReasonPhrases } from "shared/RequestError";
import express from "express";

const router = express.Router();
// 登入
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ where: { email } });
    if (!employee || !employee.verifyPassword(password)) {
      throw new RequestError({
        errorMessage: ReasonPhrases.UNAUTHORIZED,
        status: StatusCodes.UNAUTHORIZED,
      });
    }
    wrapEmployeeIntoCookie(req, res, employee.toJSON());
    res.status(200).send(ReasonPhrases.OK);
  } catch (error) {
    next(error);
  }
});

router.get('/logout', async (req, res, next) => {
  try {
    clearEmployeeCookie(req, res);
    res.redirect('/panel/login');
  } catch (error) {
    next(error);
  }
});

export default router;