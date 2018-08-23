import { 
  JsonController, CurrentUser, Authorized, Post, HttpCode, Body } from 'routing-controllers'
import { Event } from './entities'
// import User from '../users/entity'

import {io} from '../index'



@JsonController()
export default class EventController {

  // @Authorized()
  @Post('/events')
  @HttpCode(201)
  async createEvent(
    // @CurrentUser() user: User,
    @Body() newEvent: Event
  ) {
    console.log("newEvent", newEvent);
    let event = new Event;
    event.name = newEvent.name;
    event.image_url = newEvent.image_url;
    event.date = newEvent.date;
    event.description = newEvent.description;
    event.ticket_count = newEvent.ticket_count;

    return event.save()

    // await Player.create({
    //   game: entity, 
    //   user,
    //   symbol: 'x'
    // }).save()

    // const event = await Event.findOneById(entity.event_id)

    // io.emit('action', {
    //   type: 'ADD_GAME',
    //   payload: event
    // })

    // return event
  }

 
}

