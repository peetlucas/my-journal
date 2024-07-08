import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class JournalEntry {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  title: string | undefined;

  @Column()
  content: string | undefined;

  @Column()
  category: string | undefined;

  @Column()
  date: Date | undefined;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User | undefined;

  @Column()
  userId: number | undefined;
}
