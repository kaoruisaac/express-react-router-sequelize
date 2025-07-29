import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import { compare, encrypt } from 'server/services/bcrypt';
import hashIds from 'server/services/hashId';
import JsonUser from '~/JsonModels/JsonUser';

class User extends Model {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public createdAt: Date;
  public updatedAt: Date;

  verifyPassword(password: string): boolean {
    return compare(password, this.password);
  }

  toJSON(): JsonUser {
    const value = { ...this.get() };
    return new JsonUser().load({
      hashId: hashIds.encode(value.id),
      name: value.name,
      email: value.email,
    });
  }
}

User.init({
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  googleId: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  hooks: {
    beforeCreate: async (user: User) => {
      if (user.dataValues.password) {
        user.dataValues.password = encrypt(user.dataValues.password);
      }
    },
    beforeUpdate: async (user: User) => {
      if (user.dataValues.changed('password')) {
        user.dataValues.password = encrypt(user.dataValues.password);
      }
    }
  },
});

export default User;