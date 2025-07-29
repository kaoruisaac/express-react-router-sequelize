import { EMPLOYEE_ROLES } from 'shared/roles';
import Employee from './models/Employee';
import './models/User'; 
import './models/Demo';
import sequelize from './sequelize';

const {
  NODE_ENV,
  DEFAULT_ADMIN,
} = process.env;

export default async () => {
  await sequelize.sync(NODE_ENV === 'production' ? {} : { alter: { drop: false } });
  if (DEFAULT_ADMIN) {
    const [name, email, password] = DEFAULT_ADMIN.split(/\s{0,}\|\s{0,}/);
    const employee = await Employee.findOne({ where: { email } });
    if (!employee) {
      await Employee.create({
        name,
        email,
        password,
        roles: EMPLOYEE_ROLES.ADMIN,
      });
    }
  }
}
