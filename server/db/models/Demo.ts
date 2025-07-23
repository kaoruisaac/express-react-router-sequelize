import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class Demo extends Model {
  public id!: number;
  public name!: string;
}

Demo.init({
  name: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  tableName: 'demos',
  modelName: 'demo',
});

export default Demo;