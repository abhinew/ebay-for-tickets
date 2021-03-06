import { 
    JsonController, CurrentUser, Authorized, Post, HttpCode, Body, Get, Param, Patch, NotFoundError} from 'routing-controllers'
import User from '../users/entity'
import { Ticket } from './entity';
  
  @JsonController()
  export default class TicketController {
  
    @Post('/ticket')
    @Authorized()
    @HttpCode(201)
    async createTicket(@CurrentUser() user: User,@Body() ticket: Ticket
    ) {

      ticket.author_name = `${user.firstName}`;
      ticket.createdDate = new Date();
      ticket.user_id = user.id;
      return ticket.save()
    }
  
    @Authorized()
    @Get('/ticket/:id([0-9]+)')
    getTicket( @Param('id') id: number) {
      return Ticket.findOneById(id);
    }
  
    @Get('/tickets/:event_id([0-9]+)')
    getTickets(@Param("event_id") event_id: number) {
      return new Promise((resolve, reject) => {
        let theTickets;
        Ticket.getTicketsOfEvent(event_id)
          .then((tickets) => {
            theTickets = tickets;
            return Promise.all(tickets.map(function (ticket) {
            
              return ticket.getRisk();
            }));
          })
          .then(function (risks) {
            resolve({
              tickets: theTickets,
              risks: risks
            });
          })
          .catch(() => reject());
      });
    }


    @Patch('/tickets/:id([0-9]+)')
    async updateTicket(
      @Param('id') id: number,
      @Body() update: Ticket
    ) {
      const ticket = await Ticket.findOneById(id);
      if (!ticket) throw new NotFoundError(`Ticket does not exist`)
      ticket.price = update.price;
      ticket.description = update.description;
      await ticket.save();
      return ticket
    }


}
  
  