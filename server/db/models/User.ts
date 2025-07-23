import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import { compare, encrypt } from 'server/services/bcrypt';
import hashIds from 'server/services/hashId';
import JsonUser from '~/JsonModels/JsonUser';

class User extends Model {
  public id: number;
  public name: string;
  public email: string;
  public googleId: string;
  public password: string;
  public createdAt: Date;
  public updatedAt: Date;

  verifyPassword(password: string): boolean {
    return compare(password, this.password);
  }

  toJSON(): JsonUser {
    return new JsonUser().load({
      hashId: hashIds.encode(this.id),
      name: this.name,
      email: this.email,
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
      if (user.password) {
        user.password = encrypt(user.password);
      }
    },
    beforeUpdate: async (user: User) => {
      if (user.changed('password')) {
        user.password = encrypt(user.password);
      }
    }
  },
});

export default User;