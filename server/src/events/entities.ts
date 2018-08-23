import { BaseEntity, PrimaryGeneratedColumn, Column, Entity} from 'typeorm'




@Entity()
export class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  event_id?: number

  @Column('text')
  name: string

  @Column('text')
  image_url: string

  @Column()
  date: Date

  @Column('text')
  description: string

  @Column()
  ticket_count: number

}


