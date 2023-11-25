import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum FakeShopSource {
  Website = 'Website',
  Extension = 'Extension',
  Crawler = 'Crawler',
  Unknown = 'Unknown',
}

@Entity({
  name: 'fake-shop',
  orderBy: { timeCreated: 'DESC', reportCount: 'DESC' },
})
export class FakeShop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  domain: string;

  @Column({
    type: 'enum',
    enum: FakeShopSource,
    default: FakeShopSource.Unknown,
  })
  source: FakeShopSource;

  @Column()
  reportCount: number = 1;

  @Column({ default: false })
  approved: boolean = false;

  @CreateDateColumn()
  timeCreated: Date;

  @UpdateDateColumn()
  timeUpdated: Date;
}
