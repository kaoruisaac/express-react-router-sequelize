import './models/Demo';

import sequelize from './sequelize';

const { NODE_ENV } = process.env;

export default async () => {
  await sequelize.sync(NODE_ENV === 'production' ? {} : { alter: { drop: false } });
}
