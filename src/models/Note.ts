import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './User'

@Entity()
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  slug: string

  @Column('text')
  content: string

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => User, (user) => user.notes)
  user: User

  @UpdateDateColumn()
  updatedAt: Date
}
