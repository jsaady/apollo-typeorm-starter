import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Permissions } from "../../common/enums/Permissions.enum";
import { BaseEntity } from "./Base";
import { Role } from "./Role.entity";

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, { eager: true })
  @JoinTable()
  roles: Role[];

  get allPermissions (): Permissions[] {
    return (this.roles || []).reduce((acc, role) => {
      return [
        ...acc,
        ...role.permissions.map(perm => perm.permission)
      ]
    }, []);
  }
}
