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
  start_date: Date

  @Column()
  end_date: Date

  @Column('text')
  description: string


  static getActiveEvents() {
    return this.createQueryBuilder("event")
                .where("event.start_date > :today", { today: new Date() })
                .getMany();
  }

}


