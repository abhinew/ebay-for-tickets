import { BaseEntity, PrimaryGeneratedColumn, Column, Entity} from 'typeorm'

@Entity()
export class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  ticket_id?: number

  @Column()
  event_id: string

  @Column()
  author_name: string

  @Column()
  price: number

  @Column('text')
  image_url: string

  @Column()
  createdDate: Date

  static getTicketsOfEvent(event_id) {
    return this.createQueryBuilder("ticket")
                .where("ticket.event_id = :event_id", {event_id})
                .getMany();
  }

}


