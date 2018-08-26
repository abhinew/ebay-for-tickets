import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

@Entity()
export class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  ticket_id?: number

  @Column()
  event_id: string

  @Column()
  author_name: string

  @Column()
  user_id: number

  @Column()
  price: number

  @Column('text')
  image_url: string

  @Column()
  createdDate: Date

  @Column()
  description: string
  
  risk;


  static async getNumberOfCommentsForTicket(ticket_id: number) {
    return this.createQueryBuilder("comment")
      .where("comment.ticket_id = :ticket_id", { ticket_id })
      .getCount();
  }

  wasAddedInBusinessHours() {
    let hours = this.createdDate.getHours()
    return (hours >=9 && hours < 17);
  }

  async getRisk() {

    var risk = 0;
    
    let numberOfTicketsForAuthor = await this.getNumberOfTicketsForAuthor();
    if (numberOfTicketsForAuthor === 1) {
      risk += 4;
    }
    let numberOfComments = await this.getNumberOfComments();

    if (numberOfComments > 3) {
      risk += 6;
    }

    risk += (this.wasAddedInBusinessHours())?-13:13;
    
    let averageTicketPrice = await this.getAverageTicketPrice();
    let ticketPrice = this.price;
    let percentageDiff = ((ticketPrice / averageTicketPrice) - 1) * 100;
    if (percentageDiff > 15) {
      percentageDiff = 15;
    }
    risk -= percentageDiff;
    var r = {
      id: this.ticket_id,
      risk
    };
    return r;
  }

  async getNumberOfComments() {
    let ticket_id = this.ticket_id;
    return await Ticket.createQueryBuilder("comment")
      .where("comment.ticket_id = :ticket_id", { ticket_id })
      .getCount();
  }

  async getNumberOfTicketsForAuthor() {
    let user_id = this.user_id;
    let count = await Ticket.createQueryBuilder("ticket")
      .where("ticket.user_id = :user_id", { user_id })
      .getCount();
    return count;
  }

  private async getAverageTicketPrice() {
    let event_id = this.event_id;
    let ticketsOfEvent = await Ticket.createQueryBuilder("ticket")
      .where("ticket.event_id = :event_id", { event_id })
      .getMany();
    var size = ticketsOfEvent.length;
    var total = 0;
    ticketsOfEvent.forEach(function (item) {
      total += item.price;
    });
    if (size === 0) {
      return 0;
    }
    return total / size;
  }

  static getTicketsOfEvent(event_id) {
    return this.createQueryBuilder("ticket")
      .where("ticket.event_id = :event_id", { event_id })
      .getMany();
  }

  static async getCommentsOfTicket(ticket_id: number) {
    return this.createQueryBuilder("comment")
      .where("comment.ticket_id = :ticket_id", { ticket_id })
      .getMany();
  }

}


