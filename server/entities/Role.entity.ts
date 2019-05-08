import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "./Base";
import { Permission } from "./Permission.entity";

@Entity()
export class Role extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable()
  permissions: Permission[];
}
