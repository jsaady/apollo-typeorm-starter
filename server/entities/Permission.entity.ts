import { Column, Entity } from "typeorm";
import { Permissions } from "../../common/enums/Permissions.enum";
import { BaseEntity } from "./Base";

@Entity()
export class Permission extends BaseEntity {
  @Column({
    type: 'enum',
    enum: Permissions,
    unique: true
  })
  permission: Permissions;
}
