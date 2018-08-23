import { BaseEntity, PrimaryGeneratedColumn, Column, Entity} from 'typeorm'

@Entity()
export class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  ticket_id?: number

  @Column()
  event_id: string

  @Column()
  author_id: string

  @Column('text')
  image_url: string

  @Column()
  date: Date

  @Column()
  risk_percent: number

  @Column()
  comments_count: number

}


