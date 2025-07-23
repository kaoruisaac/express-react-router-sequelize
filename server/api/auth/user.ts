import express from 'express';
import User from 'server/db/models/User';
import { clearUserCookie, wrapUserIntoCookie } from 'server/services/authToken';
import RequestError, { ReasonPhrases, StatusCodes } from 'shared/RequestError';

const router = express.Router();

// 註冊
router.post('/register', async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      throw new RequestError({
        errorMessage: "User already exists",
        status: StatusCodes.BAD_REQUEST,
      });
    }
    await User.create({ name, email, password });
    res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
  } catch (error) {
    next(error);
  }
});


// 登入
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.verifyPassword(password)) {
      throw new RequestError({
        errorMessage: ReasonPhrases.UNAUTHORIZED,
        status: StatusCodes.UNAUTHORIZED,
      });
    }
    wrapUserIntoCookie(req, res, user.toJSON());
    res.status(200).send(ReasonPhrases.OK);
  } catch (error) {
    next(error);
  }
});

// 登出
router.get('/logout', async (req, res, next) => {
  try {
    clearUserCookie(req, res);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

export default router;