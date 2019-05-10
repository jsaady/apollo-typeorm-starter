import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  refreshToken: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @Column()
  clientIdentifier: string;

  @Column('datetime')
  expiration: Date;

  @CreateDateColumn()
  dateIssued: Date;
}
