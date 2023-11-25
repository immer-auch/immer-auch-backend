import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FakeShop } from '../fake-shop/fake-shop.entity';

@Entity({
  name: 'fake-shop-metadata',
  orderBy: { timeCreated: 'DESC' },
})
export class FakeShopMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  whois: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  sslCertificate?: string;

  @CreateDateColumn()
  timeCreated: Date;

  @OneToOne(() => FakeShop)
  @JoinColumn()
  fakeShop: FakeShop;
}
