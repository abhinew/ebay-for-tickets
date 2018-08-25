import { 
    JsonController, CurrentUser, Authorized, Post, HttpCode, Body, Get, Param, Patch, NotFoundError} from 'routing-controllers'
import User from '../users/entity'
// import Ticket from '../tickets/entity';
import { Comment } from './entity';
  
@JsonController()
export default class CommentController {
    
    @Post('/comment')
    // @Authorized()
    @HttpCode(201)
    createComment(@CurrentUser() user: User,@Body() comment: Comment
    ) {
        console.log("comment", comment)
      comment.authorName = `${user.firstName} ${user.lastName}`;
    //   comment.ticket_id = ticket.ticket_id;
      comment.user_id = user.id
      return comment.save()
    }


    // @Authorized()
    @Get('/comment/:id([0-9]+)')
    getComment( @Param('id') id: number) {
      return Comment.findOneById(id);
    }


}
