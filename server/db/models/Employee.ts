import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import { encrypt, compare } from '../../service/bcrypt';

class Employee extends Model {
  public id: number;
  public name: string;
  public email: string;
  public roles: string[];
  public password: string;

  verifyPassword(password: string): boolean {
    return compare(password, this.password);
  }
}

Employee.init({
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: true, unique: true },
  roles: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false, defaultValue: [] },
  password: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  modelName: 'Employee',
  tableName: 'employees',
  hooks: {
    beforeCreate: async (employee: Employee) => {
      if (employee.password) {
        employee.password = encrypt(employee.password);
      }
    },
    beforeUpdate: async (employee: Employee) => {
      if (employee.changed('password')) {
        employee.password = encrypt(employee.password);
      }
    }
  }
});

export default Employee;