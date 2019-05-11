import { Column, Entity } from "typeorm";
import { Permissions } from "../../common/enums/Permissions.enum";
import { BaseEntity } from "./Base";

@Entity()
export class Permission extends BaseEntity {
  @Column()
  permission: Permissions;
}
