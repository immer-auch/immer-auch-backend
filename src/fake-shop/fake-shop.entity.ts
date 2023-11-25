import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'fake-shop',
  orderBy: { timeCreated: 'DESC', reportCount: 'DESC' },
})
export class FakeShop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  domain: string;

  @Column()
  reportCount: number = 1;

  @Column({ default: false })
  approved: boolean = false;

  @CreateDateColumn()
  timeCreated: Date;

  @UpdateDateColumn()
  timeUpdated: Date;
}
