import { BaseEntity, PrimaryGeneratedColumn, Column, Entity} from 'typeorm'




@Entity()
export class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  event_id?: number

  @Column('text', {nullable:false})
  name: string

  @Column('text')
  image: string

  @Column()
  date: Date

  @Column('text')
  description: string

  @Column()
  ticket_count: number

}


