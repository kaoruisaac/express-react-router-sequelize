import * as yup from 'yup';

export const register = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().notRequired(),
});
