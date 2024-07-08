import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { JwtModule } from '@nestjs/jwt';
import { Constants } from './constants/constants';
import { JwtStrategy } from './strategies/jwt-strategy';
import { jwtAuthGuard } from './guards/jwt-guard';
@Module({
    imports: [NatsClientModule,
        JwtModule.register({
            secret: 'abc123',
            signOptions: { expiresIn: '1h' },
          }),

    ],
    providers: [UsersService , JwtStrategy , jwtAuthGuard],
    controllers: [UsersController],
})
export class UsersModule {}
