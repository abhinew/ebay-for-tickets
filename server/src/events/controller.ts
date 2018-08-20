import { 
  JsonController, Authorized, Post, HttpCode } from 'routing-controllers'
import { Event } from './entities'

import {io} from '../index'



@JsonController()
export default class EventController {

  @Authorized()
  @Post('/events')
  @HttpCode(201)
  async createEvent() {
    const entity = await Event.create().save()

    // await Player.create({
    //   game: entity, 
    //   user,
    //   symbol: 'x'
    // }).save()

    const event = await Event.findOneById(entity.event_id)

    io.emit('action', {
      type: 'ADD_GAME',
      payload: event
    })

    return event
  }

 
}

