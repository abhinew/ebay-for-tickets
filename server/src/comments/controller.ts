import { 
    JsonController, CurrentUser, Authorized, Post, HttpCode, Body, Get, Param, Patch, NotFoundError} from 'routing-controllers'
import User from '../users/entity'
import { Comment } from './entity';


@JsonController()
export default class CommentController {
    
    @Post('/comment')
    @Authorized()
    @HttpCode(201)
    createComment(@CurrentUser() user: User,@Body() comment: Comment
    ) {
      comment.author_name = `${user.firstName}`;
      comment.user_id = user.id
      return comment.save()
    }


    @Authorized()
    @Get('/comments/:ticket_id([0-9]+)')
    getComment( @Param('ticket_id') ticket_id: number) {
      return Comment.getCommentsOfTicket(ticket_id);
    }


}
