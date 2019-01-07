import { Column, Entity } from "typeorm";
import { BaseEntity } from "./Base";

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
