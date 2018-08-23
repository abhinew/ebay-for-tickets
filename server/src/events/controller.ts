import { 
  JsonController, CurrentUser, Authorized, Post, HttpCode, Body, Get, Param } from 'routing-controllers'
import { Event } from './entities'
import User from '../users/entity'

@JsonController()
export default class EventController {

  // @Authorized()
  @Post('/events')
  @HttpCode(201)
  async createEvent(
    @CurrentUser() user: User,
    @Body() event: Event
  ) {
    return event.save()

  }

  // @Authorized()
  @Get('/events/:id([0-9]+)')
  getGame( @Param('id') id: number) {
    return Event.findOneById(id);
  }

  @Get('/allevents')
  getGames() {

    var events = Event.getActiveEvents();
    console.log(events);
    return events;
  }
//test
}

