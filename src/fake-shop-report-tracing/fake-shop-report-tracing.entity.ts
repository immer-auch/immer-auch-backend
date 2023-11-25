import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FakeShop } from '../fake-shop/fake-shop.entity';
import { IsUUID } from 'class-validator';

@Entity({
  name: 'fake-shop-report-tracing',
  orderBy: { timeCreated: 'DESC' },
})
export class FakeShopReportTracing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsUUID('4')
  reporterId: string;

  @CreateDateColumn()
  timeCreated: Date;

  @ManyToOne(() => FakeShop)
  @JoinColumn({
    name: 'fake_shop_id',
    referencedColumnName: 'id',
  })
  fakeShop: FakeShop;
}
