import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('films')
export class Film {
  @PrimaryColumn('uuid')
  id: string;
  @Column()
  rating: number;
  @Column()
  director: string;
  @Column()
  tags: string;
  @Column()
  image: string;
  @Column()
  cover: string;
  @Column()
  title: string;
  @Column()
  about: string;
  @Column()
  description: string;
  @OneToMany(() => Schedule, (schedule) => schedule.film)
  schedules: Schedule[];
}
