import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import { encrypt, compare } from '../../services/bcrypt';
import hashIds from 'server/services/hashId';
import JsonEmployee from '~/JsonModels/JsonEmployee';
import { ROLES } from 'shared/roles';
import RequestError, { StatusCodes } from 'shared/RequestError';

class Employee extends Model {
  public id: number;
  public name: string;
  public email: string;
  public roles: string;
  public password: string;

  verifyPassword(password: string): boolean {
    return compare(password, this.dataValues.password);
  }

  toJSON(): JsonEmployee {
    const value = { ...this.get() };
    return new JsonEmployee().load({
      hashId: hashIds.encode(value.id),
      name: value.name,
      email: value.email,
      roles: value.roles.split(','),
    });
  }
}

Employee.init({
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  email: {
    unique: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  roles: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Employee',
  tableName: 'employees',
  hooks: {
    beforeCreate: async (employee: Employee) => {
      if (employee.dataValues.password) {
        employee.dataValues.password = encrypt(employee.dataValues.password);
      }
      if (employee.dataValues.roles.split(',').some((role) => !ROLES.includes(role))) {
        throw new RequestError({
          errorMessage: 'Invalid role',
          status: StatusCodes.BAD_REQUEST,
        });
      }
      employee.email = employee.dataValues.email;
    },
    beforeUpdate: async (employee: Employee) => {
      if (employee.dataValues.changed('password')) {
        employee.dataValues.password = encrypt(employee.dataValues.password);
      }
      if (employee.dataValues.roles.split(',').some((role) => !ROLES.includes(role))) {
        throw new RequestError({
          errorMessage: 'Invalid role',
          status: StatusCodes.BAD_REQUEST,
        });
      }
    }
  }
});

export default Employee;