import { 
    JsonController, CurrentUser, Authorized, Post, HttpCode, Body, Get, Param } from 'routing-controllers'
import User from '../users/entity'
import { Ticket } from './entity';
  
  @JsonController()
  export default class TicketController {
  
    @Post('/ticket')
    @Authorized()
    @HttpCode(201)
    async createTicket(@CurrentUser() user: User,@Body() ticket: Ticket
    ) {
      ticket.author_name = `${user.firstName} ${user.lastName}`;
      ticket.createdDate = new Date();
      return ticket.save()
    }
  
    @Authorized()
    @Get('/ticket/:id([0-9]+)')
    getTicket( @Param('id') id: number) {
      return Ticket.findOneById(id);
    }
  
    @Get('/tickets/:event_id([0-9]+)')
    getTickets(@Param("event_id") event_id: number) {
      return Ticket.getTicketsOfEvent(event_id);
    }
  //test
}
  
  