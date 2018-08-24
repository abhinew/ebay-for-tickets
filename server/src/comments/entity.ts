import { BaseEntity, Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity()
export  class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  comment_id: number

  @Column('text')
  comment: string

  @Column('int')
  user_id: number

  @Column('int')
  ticket_id: number
}
