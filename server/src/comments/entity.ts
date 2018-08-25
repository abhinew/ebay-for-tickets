import { BaseEntity, Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { text } from 'body-parser';

@Entity()
export  class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  comment_id: number

  @Column('text')
  text: string

  @Column()
  authorName: string

  @Column()
  ticket_id: number

  @Column()
  user_id: number
  
}
