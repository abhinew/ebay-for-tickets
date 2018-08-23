import { 
    JsonController, CurrentUser, Authorized, Post, HttpCode, Body, Get, Param } from 'routing-controllers'
import User from '../users/entity'
import { Ticket } from './entity';
  
  @JsonController()
  export default class TicketController {
  
    // @Authorized()
    // @Post('/tickets')
    // @HttpCode(201)
    // async createEvent(
    //   @CurrentUser() user: User,
    //   @Body() ticket: Ticket
    // ) {
    //   return ticket.save()
  
    // }
  
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
  
  