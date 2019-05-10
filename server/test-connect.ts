import Container from "typedi";
import { Connection, createConnection, useContainer } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
let connection: Connection;
export const open = async () => {
  useContainer(Container);
  connection = await createConnection(Object.assign<MysqlConnectionOptions, MysqlConnectionOptions>(require('./ormconfig.json')[0], {
    type: 'mysql',
    database: 'test'
  }));

  await connection.runMigrations();
};

export const cleanup = async () => {
  const queryRunner = connection.createQueryRunner();
  
  await queryRunner.dropDatabase('test');
  await queryRunner.createDatabase('test', true);
}

export const close = async () => {
  await cleanup();
  return connection.close();
}
