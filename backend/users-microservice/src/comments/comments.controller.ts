import { Controller } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Comments } from 'src/typeorm/entities/Comments';
import { commentsDto, updateCommentDto } from './dtos/comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @MessagePattern({ cmd: 'ajouter_commentaire'})
    async createComment(@Payload() payload : {data: commentsDto, id: string}) : Promise<Comments> {
        try {
            const { data, id } = payload;

            console.log("Received comment:", data);
            console.log("Received user ID:", id);
            const newComment = await this.commentsService.createComment(data , id);
            console.log("newComment", newComment);
            return newComment;
        } catch (error) {
            console.error("Error in createComment:", error.message);
            throw new RpcException(error.message);
        }
    }
    
    @MessagePattern({ cmd: 'supprimer_commentaire' })
    async deleteComment(@Payload() Payload: { id: string , commentId: string }): Promise<Comments> {
        try {
            const { id , commentId } = Payload;
            const findCommentById: Comments = await this.commentsService.deleteComment(id , commentId);
            return findCommentById;
        } catch (error) {
            throw new RpcException(error.message);
        }
    }

    @MessagePattern({ cmd: 'modifier_commentaire' })
  async updateComment(@Payload() payload: { id: string, data: updateCommentDto, commentId: string }): Promise<Comments> {
    try {
      const { id, data, commentId } = payload;
      console.log("Payload received for update:", payload);
      const updatedComment = await this.commentsService.updateComment(data, id, commentId);
      console.log("Updated comment:", updatedComment);
      return updatedComment;
    } catch (error) {
      console.error("Error in updateComment:", error.message);
      throw new RpcException(error.message);
    }
  }

    @MessagePattern({ cmd: 'get_all_commentaires' })
    async getAllCommentaires(@Payload() id: string): Promise<Comments[]> {
        try {
            const allComments: Comments[] = await this.commentsService.getAllComments(id);
            return allComments;
        } catch (error) {
            throw new RpcException(error.message);
        }
    }
}
