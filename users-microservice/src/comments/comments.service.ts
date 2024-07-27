import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { commentsDto, updateCommentDto } from 'src/equipe/dtos/comment.dto';
import { Comments } from 'src/typeorm/entities/Comments';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments) private readonly commentsRepository: Repository<Comments>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createComment(comment: commentsDto, id: string ): Promise<Comments> {
    try { 
      console.log ("id:" , id) ;
        const findUserById : User = await this.userRepository.findOne({ where: { id  }, relations: ["comments"] });
        if (!findUserById) {
        throw new Error('User not found');
      }
      if (!comment.comment || !comment.name) {
        throw new Error('Comment text and name are required');
    }
      console.log("Found user by ID:", findUserById);

      console.log("findUserById",findUserById)
      const newComment = this.commentsRepository.create(comment);
      newComment.user = findUserById;
      console.log("newComment",newComment)
      await this.commentsRepository.save(newComment);
      
      return newComment;
    } catch (error) {
      
      return error;
    }
  }

  async deleteComment (id : string , commentId : string) : Promise<Comments> {
    try {
      const comment  = await this.commentsRepository.findOne({ where: { id_comment : commentId } , relations: ["user"] });
      if (!comment) {
        throw new Error('Comment not found');
      }
      const findUserById : User = await this.userRepository.findOne({ where: { id  }, relations: ["comments"] });
      if (!findUserById) {
        throw new Error('User not found');
      }

      await this.commentsRepository.remove(comment);
      return comment;
    } catch (error) {
      return error
    }
  } 


  async updateComment(commentUpdated: updateCommentDto, id: string, commentId: string): Promise<Comments> {
    try {
      console.log("Updating comment for user ID:", id, "and comment ID:", commentId);
      const comment: Comments = await this.commentsRepository.findOne({ where: { id_comment: commentId }, relations: ["user"] });
      if (!comment) {
        throw new Error('Comment not found');
      }
      const findUserById: User = await this.userRepository.findOne({ where: { id }, relations: ["comments"] });
      if (!findUserById) {
        throw new Error('User not found');
      }
      console.log("Found comment and user for update");
      comment.comment = commentUpdated.comment;
      await this.commentsRepository.save(comment);
      return comment;
    } catch (error) {
      console.error("Error in updateComment service:", error.message);
      throw new Error(error.message);
    }
  }

  async getAllComments(id : string) : Promise<Comments[]> {
    try { 
        const findUserById : User = await this.userRepository.findOne({ where: {id}, relations: ["comments"] });
        console.log("findUserById",findUserById)
        if (!findUserById) {
          throw new Error('User not found');
        }
      const comments = await this.commentsRepository.find({ relations: ["user"] });
      console.log("comments",comments)
      return comments;
    } catch (error) {
      return error
    }
  }
}
