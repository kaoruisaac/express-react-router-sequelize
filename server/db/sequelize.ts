import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './storage/db/sqlite.db',
})


export default sequelize;
