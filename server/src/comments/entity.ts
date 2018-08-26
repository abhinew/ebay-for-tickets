import { BaseEntity, Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { text } from 'body-parser';

@Entity()
export  class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  comment_id: number

  @Column('text')
  text: string

  @Column()
  author_name: string

  @Column()
  ticket_id: number

  @Column()
  user_id: number

  
  static async getCommentsOfTicket(ticket_id: number) {
    return this.createQueryBuilder("comment")
      .where("comment.ticket_id = :ticket_id", { ticket_id })
      .getMany();
  }
}
