import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from 'src/typeorm/entities/Comments';
import { User } from 'src/typeorm/entities/User';

@Module({
    imports: [TypeOrmModule.forFeature([Comments, User])],
    controllers: [CommentsController],
    providers: [CommentsService],
})
export class CommentsModule {}
