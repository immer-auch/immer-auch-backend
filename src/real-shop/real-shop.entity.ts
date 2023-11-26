import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'real-shop',
  orderBy: { timeCreated: 'DESC' },
})
export class RealShop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  domain: string;

  @Column({
    type: 'text',
  })
  whois: string;

  @CreateDateColumn()
  timeCreated: Date;
}
