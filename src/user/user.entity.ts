import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'email_address',
    nullable: false,
  })
  account: string;

  @Column({
    nullable: false,
  })
  password: string;
}
