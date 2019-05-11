import Container from "typedi";
import { Connection, createConnection, useContainer } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
let connection: Connection;
export const open = async () => {
  useContainer(Container);
  const mySqlOptions: MysqlConnectionOptions = require('./ormconfig.json')[0];
  const mappedOptions = Object.assign<MysqlConnectionOptions, MysqlConnectionOptions>(mySqlOptions, {
    username: 'MYSQL_USERNAME' in process.env ? process.env.MYSQL_USERNAME || undefined : mySqlOptions.username,
    password: 'MYSQL_PASSWORD' in process.env ? process.env.MYSQL_PASSWORD || undefined : mySqlOptions.password,
    type: 'mysql',
    database: 'test'
  });

  console.log(mappedOptions);
  connection = await createConnection(mappedOptions);

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