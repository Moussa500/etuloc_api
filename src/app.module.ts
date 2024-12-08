import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HouseModule } from './house/house.module';

@Module({
  imports: [DataBaseModule,UserModule, AuthModule, HouseModule],
})
export class AppModule {}
