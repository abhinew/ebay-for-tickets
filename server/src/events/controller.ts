import { 
  JsonController, CurrentUser, Authorized, Post, HttpCode, Body, Get, Param } from 'routing-controllers'
import { Event } from './entities'
import User from '../users/entity'

// import {io} from '../index'



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

  @Authorized()
  @Get('/events/:id([0-9]+)')
  getGame( @Param('id') id: number) {
    return Event.findOneById(id)
  }

  @Authorized()
  @Get('/events')
  getGames() {
    return Event.find()
  }
 
}

