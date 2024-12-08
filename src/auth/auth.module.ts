import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordHelper } from 'src/helpers';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/middlewares/authguard.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),JwtModule.register({global:true,secret:jwtConstants.secret,signOptions:{expiresIn:'2d'}})],
  controllers: [AuthController],
  providers: [{provide:APP_GUARD,useClass:AuthGuard},AuthService, PasswordHelper, UserService]
})
export class AuthModule {}
