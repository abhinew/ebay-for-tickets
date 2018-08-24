import { 
  JsonController, Authorized, Post, HttpCode, Body, Get, Param } from 'routing-controllers'
import { Event } from './entities'

@JsonController()
export default class EventController {

  @Authorized()
  @Post('/events')
  @HttpCode(201)
  async createEvent(
    @Body() event: Event
  ) {
    return event.save()
  }

  @Authorized()
  @Get('/events/:id([0-9]+)')
  getEvent( @Param('id') id: number) {
    return Event.findOneById(id);
  }

  @Get('/allevents')
  getEvents() {

    var events = Event.getActiveEvents();
    console.log(events);
    return events;
  }
//test
}

