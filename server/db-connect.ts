import { createConnection } from "typeorm";
import { Permission } from "./entities/Permission.entity";
import { RefreshToken } from "./entities/RefreshToken.entity";
import { Role } from "./entities/Role.entity";
import { User } from "./entities/User.entity";

export function dbConnect (connectionIndex = 0) {
  const config = require('./ormconfig.json');
  
  return createConnection({
    ...config[connectionIndex],
    migrations: [],
    entities: [
      Permission,
      RefreshToken,
      Role,
      User
    ]
  });
}